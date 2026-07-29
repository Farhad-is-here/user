import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class VendorApplyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  storeName!: string;

  @IsString()
  @MaxLength(15)
  phone!: string;

  @IsString()
  @MaxLength(200)
  address!: string;

  @IsOptional()
  @IsString()
  cityId?: string;
}