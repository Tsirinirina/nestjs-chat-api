import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Conversation {
  _id?: string | Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  text: string;
}

export type ConversationDocument = HydratedDocument<Conversation>;

export const conversationSchema = SchemaFactory.createForClass(Conversation);
