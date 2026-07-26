import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/Users/users.service';
import { CustomerProfile } from 'src/customer/entites/customer-profile.entity';
import { User } from 'src/Users/user.entity';
import { ChangePasswordDto } from 'src/customer/dtos/changePassword.dto';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import { VendorStatus } from 'src/vendors/vendor.enums';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(CustomerProfile)
    private customerProfileRepo: Repository<CustomerProfile>,
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  async comparePasswords(storedPassword: string, suppliedPassword: string) {
    const [salt, storedHash] = storedPassword.split('.');
    const hash = (await scrypt(suppliedPassword, salt, 32)) as Buffer;
    const storedHashBuffer = Buffer.from(storedHash, 'hex');

    return (
      storedHashBuffer.length === hash.length &&
      timingSafeEqual(storedHashBuffer, hash)
    );
  }

  async signup(email: string, password: string, username: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create(email, hashedPassword, username);

    const customerProfile = this.customerProfileRepo.create({ user });
    await this.customerProfileRepo.save(customerProfile);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('bad email or password');
    }

    const isValid = await this.comparePasswords(user.password, password);
    if (!isValid) {
      throw new BadRequestException('bad email or password');
    }

    return user;
  }

async signToken(user: User) {
  const vendor = await this.vendorRepo.findOne({ where: { user: { id: user.id } } });

  return this.jwtService.sign({
    sub: user.id,
    email: user.email,
    isVendor: vendor?.status === VendorStatus.APPROVED,
  });
}

  async changePassword(userId: number, dto: ChangePasswordDto) {
  const user = await this.usersService.findOne(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const isValid = await this.comparePasswords(user.password, dto.currentPassword);
  if (!isValid) {
    throw new BadRequestException('current password is incorrect');
  }

  const hashedPassword = await this.hashPassword(dto.newPassword);
  return this.usersService.update(userId, { password: hashedPassword });
}
}