import { IsOptional, IsString } from 'class-validator';


// update/edit shippping info of customer
export class UpdateCustomerProfileDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  cityId?: string; 
}