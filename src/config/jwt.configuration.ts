import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from './config.constant';

export const JwtConfiguration: JwtModuleOptions = {
  secret: config().jwt.secretKey,
  signOptions: { expiresIn: config().jwt.expiration },
};
