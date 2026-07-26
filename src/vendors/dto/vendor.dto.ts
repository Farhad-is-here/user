import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/customer/dtos/user.dto';

export class VendorDto {
  @Expose()
  id!: number;

  @Expose()
  storeName!: string;

  @Expose()
  phone!: string;

  @Expose()
  address!: string;

  @Expose()
  status!: string;

  @Expose()
  @Type(() => UserDto)
  user!: UserDto;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date;
}