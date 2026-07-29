import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfile } from './entites/customer-profile.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerProfile)
    private customerProfileRepo: Repository<CustomerProfile>,
    private readonly http: HttpService,
  ) {}

  async findByUserId(userId: number) {
    const profile = await this.customerProfileRepo.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!profile) {
      throw new InternalServerErrorException('Customer profile not found');
    }

    return profile;
  }

  async updateProfile(userId: number, dto: { address?: string; phone?: string }) {
    const profile = await this.findByUserId(userId);

    Object.assign(profile, dto);
    return this.customerProfileRepo.save(profile);
  }

  async isReadyToPurchase(userId: number){
    const profile = await this.findByUserId(userId);
    return !!profile.address && !!profile.phone;
  }

  async getAddress(userId: number) {
    const { data } = await firstValueFrom(
      this.http.get(
        `http://localhost:3001/internal/users/${userId}/address`,
      ),
    );

    return data;
  }
}