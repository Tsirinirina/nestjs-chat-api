import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDCDto {
  @IsString()
  sender: string;

  @IsString()
  receiver: string;

  @IsString()
  conversation: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
