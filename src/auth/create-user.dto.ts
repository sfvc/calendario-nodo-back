import { IsEnum, IsEmail, IsString, MinLength } from 'class-validator';
import { UserRole } from './roles.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}