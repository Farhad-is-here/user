// dtos/auth-signin.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class AuthSigninDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}