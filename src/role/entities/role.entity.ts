import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Permission } from 'src/permission/entities/permission.entity';

@Schema({ timestamps: true })
export class Role {
  _id?: Types.ObjectId;

  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, trim: true, required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }], default: [] })
  permissions: Types.ObjectId[];
}

export type RoleDocument = HydratedDocument<Role>;

export const RoleSchema = SchemaFactory.createForClass(Role);
