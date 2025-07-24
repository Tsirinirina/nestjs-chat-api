import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PermissionName } from 'src/enums/permissions.enum';

@Schema()
export class Permission {
  _id?: string | Types.ObjectId;

  @Prop({ type: String, enum: PermissionName, required: true, trim: true })
  name: PermissionName;
}

export type PermissionDocument = HydratedDocument<Permission>;

export const permissionSchema = SchemaFactory.createForClass(Permission);
