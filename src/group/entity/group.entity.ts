import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Group {
  _id?: string | Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: User.name, required: true })
  participants: Types.ObjectId[];

  @Prop({ type: String, required: false, default: 'Group anonyme' })
  name?: string;
}

export type GroupDocument = HydratedDocument<Group>;

export const groupSchema = SchemaFactory.createForClass(Group);
