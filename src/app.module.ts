import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CoreModule } from './core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config.constant';
import { Reflector } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { TokenRequestModule } from './token-request/token-request.module';
import { ConversationModule } from './conversation/conversation.module';
import { DirectConversationModule } from './direct-conversation/direct-conversation.module';
import { GroupConversationModule } from './group-conversation/group-conversation.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    HttpModule,
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(config().database.mongoUri, {}),
    AuthModule,
    UserModule,
    PermissionModule,
    RoleModule,
    TokenRequestModule,
    ConversationModule,
    DirectConversationModule,
    GroupConversationModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, Reflector],
})
export class AppModule {}
