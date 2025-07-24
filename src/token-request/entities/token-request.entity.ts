import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export enum TokenRequestStatus {
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  USED = 'USED',
}

export enum TokenRequestType {
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

@Schema()
export class TokenRequest {
  _id?: string | Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  token: string;

  @Prop({ type: Date, required: true })
  requestDate: Date;

  @Prop({ type: Date, required: true })
  expirationDate: Date;

  @Prop({ type: Date, required: false })
  usageDate?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ type: String, trim: true, required: true })
  userMail: string;

  @Prop({
    type: String,
    enum: Object.values(TokenRequestStatus),
    required: true,
  })
  status: TokenRequestStatus;

  @Prop({ type: String, enum: Object.values(TokenRequestType), required: true })
  type: TokenRequestType;
}

export type TokenRequestDocument = HydratedDocument<TokenRequest>;

export const tokenRequestSchema = SchemaFactory.createForClass(TokenRequest);
