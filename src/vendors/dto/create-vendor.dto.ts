import { IsString, MaxLength, MinLength } from "class-validator";


export class ApplyVendorDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    storeName!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(12)
    phone!: string;

    @IsString()
    @MinLength(5)
    @MaxLength(200)
    shopAddress!: string;

}