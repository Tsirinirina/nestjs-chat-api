import { Module } from '@nestjs/common';
import { GroupConversationService } from './group-conversation.service';
import { GroupConversationGateway } from './group-conversation.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GroupConversation,
  groupConversationSchema,
} from './entity/group-conversation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GroupConversation.name, schema: groupConversationSchema },
    ]),
  ],
  providers: [GroupConversationService, GroupConversationGateway],
})
export class GroupConversationModule {}
