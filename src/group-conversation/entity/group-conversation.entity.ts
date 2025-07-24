import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Conversation } from 'src/conversation/entity/conversation.entity';
import { Group } from 'src/group/entity/group.entity';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class GroupConversation {
  _id?: string | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Group.name, required: true })
  group: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Conversation.name, required: true })
  conversation: Types.ObjectId;

  @Prop({ type: Boolean, required: false, default: false })
  isDeleted?: boolean;
}

export type GroupConversationDocument = HydratedDocument<GroupConversation>;

export const groupConversationSchema =
  SchemaFactory.createForClass(GroupConversation);
