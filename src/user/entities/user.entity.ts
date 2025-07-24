import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
  _id?: string | Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  username: string;

  @Prop({ type: String, trim: true, required: true })
  email: string;

  @Prop({ type: String, trim: true })
  password?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Role.name }], default: [] })
  roles: Types.ObjectId[];

  @Prop({ type: Number, required: false })
  failedConnectionCount?: number;

  @Prop({ type: Boolean, default: true, required: false })
  isActive: boolean;
}

export type UserDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.pre<UserDocument>('findOneAndUpdate', async function (next) {
  if (this.password) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  next();
});
