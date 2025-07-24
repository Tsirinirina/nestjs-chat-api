/* eslint-disable complexity */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { TokenRequestService } from 'src/token-request/token-request.service';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config.constant';
import { AccessTokenPayload } from 'src/types/user.payload';
import { TokenRequestStatus } from 'src/token-request/entities/token-request.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenRequestService: TokenRequestService,
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.getAllUser();
  }

  findUserById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.getUserByUsername(username);
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: string): Promise<User | null> {
    return this.userRepository.deleteUser(id);
  }

  async verifyToken(token: string): Promise<AccessTokenPayload> {
    try {
      return await this.jwtService.verify(token, {
        secret: config().jwt.secretKey,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async requestPasswordReset(email: string): Promise<string | null> {
    const user: User | null = await this.findUserByEmail(email);
    if (!user) {
      return null;
    } else {
      const { token } =
        await this.tokenRequestService.requestTokenForPasswordReset(user);
      return token;
    }
  }

  async resetPassword(password: string, token: string): Promise<User | null> {
    const tokenRequest = await this.tokenRequestService.getToken(token);
    if (tokenRequest?.status === TokenRequestStatus.EXPIRED) {
      throw new BadRequestException('Token expired.', 'TOKEN EXPIRED');
    }
    if (tokenRequest?.status === TokenRequestStatus.USED) {
      throw new BadRequestException(
        'Token already used.',
        'TOKEN ALREADY USED',
      );
    }
    const newPassword = await bcrypt.hash(password, 10);
    if (tokenRequest?.user) {
      await this.tokenRequestService.markUsedToken(token);
      const res = await this.userRepository.updateUserPassword(
        tokenRequest?.user?._id as string,
        newPassword,
      );
      return res;
    } else {
      throw new BadRequestException('Not usable token');
    }
  }
}
