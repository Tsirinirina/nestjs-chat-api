import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { TOKEN_REPOSITORY } from './token-request.constant';
import { TokenRequestRepository } from './token-request.repository';
import { TokenRequest } from './entities/token-request.entity';

@Injectable()
export class TokenRequestService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRequestRepo: TokenRequestRepository,
  ) {}

  requestTokenForPasswordReset(user: User) {
    return this.tokenRequestRepo.requestTokenForPasswordReset(user);
  }

  getToken(token: string): Promise<TokenRequest | null> {
    return this.tokenRequestRepo.getToken(token);
  }

  markUsedToken(token: string): Promise<boolean> {
    return this.tokenRequestRepo.markUsedToken(token);
  }

  markTokenAsExpired(token: string): Promise<TokenRequest> {
    return this.tokenRequestRepo.markTokenAsExpired(token);
  }
}
