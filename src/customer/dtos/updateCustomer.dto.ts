import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}