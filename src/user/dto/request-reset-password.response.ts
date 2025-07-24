import { IsNotEmpty, IsString } from 'class-validator';

export class RequestResetPasswordResponse {
  @IsNotEmpty()
  @IsString()
  token: string;
}
