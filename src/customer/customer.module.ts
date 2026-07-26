import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/user.entity';
import { UsersService } from 'src/Users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { CustomerProfile } from './entites/customer-profile.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CustomerProfile, Vendor])],
  controllers: [CustomerController],
  providers: [CustomerService, AuthService, UsersService],
  exports: [AuthService, UsersService],
})
export class CustomerModule {}
