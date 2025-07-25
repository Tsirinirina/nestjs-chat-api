import { forwardRef, Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationGateway } from './conversation.gateway';
import { CONVERSATION_REPOSITORY } from './conversation.repository';
import { ConversationMongoDbAdapter } from './conversation.mongodb.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, conversationSchema } from './entity/conversation.entity';
import { ConversationController } from './conversation.controller';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: conversationSchema },
    ]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    ConversationGateway,
    { provide: CONVERSATION_REPOSITORY, useClass: ConversationMongoDbAdapter },
  ],
})
export class ConversationModule {}
