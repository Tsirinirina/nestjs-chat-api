import { Types } from 'mongoose';

export class UserLoginDto {
  id: string;
  username: string;
  email: string;
  roles: Types.ObjectId[];
}
