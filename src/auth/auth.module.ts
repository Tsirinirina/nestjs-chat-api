import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguration } from 'src/config/jwt.configuration';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CONFIGURATION_TOKEN_DI } from 'src/config/configuration.interface';
import { config } from 'src/config/config.constant';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,
    JwtModule.register(JwtConfiguration),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: CONFIGURATION_TOKEN_DI,
      useValue: config(),
    },
  ],
  exports: [AuthService, AuthModule],
})
export class AuthModule {}
