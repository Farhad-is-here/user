import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CustomerSignupDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Transform(({ value }) => value?.trim())
    username!: string;
}