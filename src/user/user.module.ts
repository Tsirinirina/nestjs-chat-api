import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    RoleModule,
    JwtModule.register(JwtConfiguration),
    TokenRequestModule,
  ],

  controllers: [UserController],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserMongoDbAdapter },
  ],
  exports: [UserService],
})
export class UserModule {}
