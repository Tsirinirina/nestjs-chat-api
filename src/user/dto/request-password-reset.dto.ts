import { IsNotEmpty, IsString } from 'class-validator';

export class RequestPasswordResetDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
