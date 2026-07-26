import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorStatus } from './vendor.enums';

@Injectable()
export class VendorGuard implements CanActivate {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;

    if (!user) {
      throw new ForbiddenException('Not authenticated');
    }

    const vendor = await this.vendorRepo.findOne({ where: { user: { id: user.id } } });

    if (!vendor || vendor.status !== VendorStatus.APPROVED) {
      throw new ForbiddenException('Vendor access requires an approved vendor account');
    }

    return true;
  }
}