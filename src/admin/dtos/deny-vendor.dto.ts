import { IsString, IsNotEmpty } from 'class-validator';

export class DenyVendorDto {
  @IsString()
  @IsNotEmpty()
  reason!: string;
}