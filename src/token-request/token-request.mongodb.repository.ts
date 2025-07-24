import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { User } from '../user/entities/user.entity';
import {
  TokenRequest,
  TokenRequestDocument,
  TokenRequestStatus,
  TokenRequestType,
} from './entities/token-request.entity';
import { TOKEN_REQUEST_EXPIRATION } from './token-request.constant';
import { TokenRequestRepository } from './token-request.repository';

@Injectable()
export class TokenRequestMongoDbAdapter implements TokenRequestRepository {
  constructor(
    @InjectModel(TokenRequest.name)
    private readonly tokenRequestModel: Model<TokenRequestDocument>,
  ) {}

  async markUsedToken(token: string): Promise<boolean> {
    const requestToken = await this.tokenRequestModel.findOne({ token });
    if (requestToken) {
      await this.tokenRequestModel.findByIdAndUpdate(
        requestToken._id.toString(),
        { status: TokenRequestStatus.USED },
      );
      return true;
    }
    return false;
  }

  async generateNewToken(): Promise<string> {
    const token = nanoid();
    if ((await this.tokenRequestModel.countDocuments({ token })) > 0) {
      return this.generateNewToken();
    }
    return token;
  }

  async markTokenAsExpired(token: string): Promise<TokenRequest> {
    return (await this.tokenRequestModel.findOneAndUpdate(
      { token },
      { status: TokenRequestStatus.EXPIRED },
    )) as TokenRequest;
  }

  async evaluateTokenExpiration(
    tokenRequest: TokenRequest,
  ): Promise<TokenRequest> {
    const isExpirationDatePassed =
      new Date().getTime() > new Date(tokenRequest.expirationDate).getTime();

    if (isExpirationDatePassed) {
      await this.markTokenAsExpired(tokenRequest.token);
      return (await this.tokenRequestModel.findById(
        tokenRequest._id as string,
      )) as TokenRequest;
    }
    return tokenRequest;
  }

  async requestTokenForPasswordReset(user: User): Promise<TokenRequest> {
    const tokenExpirationDelay = TOKEN_REQUEST_EXPIRATION;
    const { email } = user;

    const existingToken: TokenRequest | null =
      await this.tokenRequestModel.findOne({
        userMail: email,
        status: TokenRequestStatus.PENDING,
      });

    if (existingToken) {
      const evaluatedToken = await this.evaluateTokenExpiration(existingToken);
      return evaluatedToken.status === TokenRequestStatus.EXPIRED
        ? this.requestTokenForPasswordReset(user)
        : evaluatedToken;
    }
    const newExpirationDate = new Date(Date.now() + tokenExpirationDelay);
    return this.tokenRequestModel.create({
      expirationDate: newExpirationDate,
      requestDate: new Date(),
      status: TokenRequestStatus.PENDING,
      token: await this.generateNewToken(),
      type: TokenRequestType.RESET_PASSWORD,
      user,
      userMail: email,
    });
  }

  async getToken(token: string): Promise<TokenRequest | null> {
    const requestToken = (await this.tokenRequestModel
      .findOne({
        token,
      })
      .populate('user')) as TokenRequest;

    if (!requestToken) {
      return null;
    }

    await this.evaluateTokenExpiration(requestToken);

    const newRequest = (await this.tokenRequestModel
      .findOne({
        token,
      })
      .populate('user')) as TokenRequest;

    return newRequest;
  }
}
