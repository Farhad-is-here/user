import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorService } from './vendors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { UsersService } from 'src/Users/users.service';
import { User } from 'src/Users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, User]),
  CustomerModule],
  controllers: [VendorsController],
  providers: [VendorService],
  exports: [VendorService]
})
export class VendorsModule {}
