import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalController } from './internal.controller';
import { InternalService } from './internal.service';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { CustomerProfile } from 'src/customer/entites/customer-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfile, Vendor])],
  controllers: [InternalController],
  providers: [InternalService],
})
export class InternalModule {}