import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsArray()
  @IsMongoId({ each: true })
  participants: string[];

  @IsString()
  @IsOptional()
  name: string;
}
