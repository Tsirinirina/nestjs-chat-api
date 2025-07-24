import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsArray()
  @IsMongoId({ each: true })
  roles: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
