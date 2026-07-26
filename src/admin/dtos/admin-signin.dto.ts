import { IsString } from 'class-validator';

export class AdminSigninDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}