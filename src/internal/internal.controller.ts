import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InternalService } from './internal.service';
import { CustomerService } from 'src/customer/customer.service';
import { VendorService } from 'src/vendors/vendors.service';

@Controller('internal')
export class InternalController {
  constructor(
    private customerService: CustomerService,
    private VendorsService: VendorService,

  ) {}

@Get('users/:userId/profile')
async getUserProfile(@Param('userId') userId: string) {
    const customerProfile = await this.customerService
      .findByUserId(parseInt(userId))
      .catch(() => null);

    const vendorProfile = await this.VendorsService
      .findByUserId(parseInt(userId))
      .catch(() => null);

    return {
      customerId: customerProfile?.id ?? null,
      vendorId: vendorProfile?.id ?? null,
      cityId: customerProfile?.cityId ?? vendorProfile?.cityId ?? null,
    };
  }
}