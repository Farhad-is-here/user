import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorStatus } from './vendor.enums';
import { Repository } from 'typeorm';
import { User } from 'src/Users/user.entity';
import { VendorApplyDto } from './dto/vendor-apply.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private readonly vendorRepo: Repository<Vendor>,
  ) {}

  // user applies to be vendor
  async apply(user: User, dto: VendorApplyDto) {
    if (!dto.storeName|| !dto.address || !dto.phone) {
      throw new BadRequestException(
        'storeName, address, and phone are required to apply as a vendor',
      );
    }

    const existing = await this.vendorRepo.findOne({ where: { user: { id: user.id } } });
    if (existing) {
      throw new ConflictException('You have already applied as a vendor');
    }

    const vendor = this.vendorRepo.create({
      user,
      storeName: dto.storeName,
      address: dto.address,
      phone: dto.phone,
      status: VendorStatus.PENDING,
    });

    return this.vendorRepo.save(vendor);
  }

  async findByUserId(userId: number) {
    const vendor = await this.vendorRepo.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }

  async update(userId: number, dto: UpdateVendorDto) {
    const vendor = await this.findByUserId(userId);

    Object.assign(vendor, dto);
    return this.vendorRepo.save(vendor);
  }

  async remove(userId: number) {
    const vendor = await this.findByUserId(userId);
    await this.vendorRepo.remove(vendor);
    return { message: 'Vendor account deleted successfully' };
  }

  // Admin methods

  async findPending() {
    return this.vendorRepo.find({
      where: { status: VendorStatus.PENDING },
      relations: { user: true },
    });
  }

  async findById(vendorId: number) {
    const vendor = await this.vendorRepo.findOne({
      where: { id: vendorId },
      relations: { user: true },
    });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }

  async approve(vendorId: number) {
    const vendor = await this.findById(vendorId);
    vendor.status = VendorStatus.APPROVED;
    vendor.denialReason = undefined;
    return this.vendorRepo.save(vendor);
  }

  async deny(vendorId: number, reason: string) {
    if (!reason) {
      throw new BadRequestException('A denial reason is required');
    }
    const vendor = await this.findById(vendorId);
    vendor.status = VendorStatus.DENIED;
    vendor.denialReason = reason;
    return this.vendorRepo.save(vendor);
  }
}