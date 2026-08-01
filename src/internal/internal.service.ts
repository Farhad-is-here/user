import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerProfile } from 'src/customer/entites/customer-profile.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { Repository } from 'typeorm';


@Injectable()
export class InternalService {
  constructor(
    @InjectRepository(CustomerProfile)
    private customerRepo: Repository<CustomerProfile>,

    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async getUserProfile(userId: number) {
    const [customer, vendor] = await Promise.all([
      this.customerRepo.findOne({ where: { user: { id: userId } } }),
      this.vendorRepo.findOne({ where: { user: { id: userId } } }),
    ]);

    return {
      customerId: customer?.id ?? null,
      vendorId: vendor?.id ?? null,
      cityId: vendor?.cityId ?? customer?.cityId ?? null,
    };
  }
}