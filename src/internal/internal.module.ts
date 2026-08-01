import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalController } from './internal.controller';
import { InternalService } from './internal.service';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { CustomerProfile } from 'src/customer/entites/customer-profile.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [CustomerModule, VendorsModule],
  controllers: [InternalController],
})
export class InternalModule {}