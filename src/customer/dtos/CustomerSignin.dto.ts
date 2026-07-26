import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CustomerSigninDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

}