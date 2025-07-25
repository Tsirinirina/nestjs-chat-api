import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguration } from 'src/config/jwt.configuration';
import { USER_REPOSITORY } from './user.repository';
import { UserMongoDbAdapter } from './user.mongodb.adapter';
import { TokenRequestModule } from 'src/token-request/token-request.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule.register(JwtConfiguration),
    TokenRequestModule,
    RoleModule,
    forwardRef(() => AuthModule),
  ],

  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserMongoDbAdapter },
  ],
  exports: [UserService],
})
export class UserModule {}
