import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthenticationResponse } from 'src/types/authentication-response';
import { config } from 'src/config/config.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user: User | null =
      await this.userService.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  login(user: User): Promise<AuthenticationResponse> {
    const token = this.jwtService.sign(
      {
        userId: user._id,
        username: user.username,
        roles: user.roles.map((role) => role._id.toString()),
      },
      { secret: config().jwt.secretKey, expiresIn: config().jwt.expiration },
    );

    return Promise.resolve({
      token,
      user: {
        id: user._id?.toString() as string,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    });
  }
}
