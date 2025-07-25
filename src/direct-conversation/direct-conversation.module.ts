import { forwardRef, Module } from '@nestjs/common';
import { DirectConversationService } from './direct-conversation.service';
import { DirectConversationController } from './direct-conversation.controller';
import { DirectConversationGateway } from './direct-conversation.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DirectConversation,
  directConversationSchema,
} from './entity/direct-conversation.entity';
import { DIRECT_CONVERSATION_REPOSITORY } from './direct-conversation.repository';
import { DirectConversationMongoDbAdapter } from './direct-conversation.mongodb.adapter';
import { CONVERSATION_REPOSITORY } from 'src/conversation/conversation.repository';
import { ConversationMongoDbAdapter } from 'src/conversation/conversation.mongodb.adapter';
import {
  Conversation,
  conversationSchema,
} from 'src/conversation/entity/conversation.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DirectConversation.name, schema: directConversationSchema },
      { name: Conversation.name, schema: conversationSchema },
    ]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [DirectConversationController],
  providers: [
    DirectConversationService,
    DirectConversationGateway,

    {
      provide: DIRECT_CONVERSATION_REPOSITORY,
      useClass: DirectConversationMongoDbAdapter,
    },
    { provide: CONVERSATION_REPOSITORY, useClass: ConversationMongoDbAdapter },
  ],
})
export class DirectConversationModule {}
