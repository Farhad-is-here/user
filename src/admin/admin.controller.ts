import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminGuard } from './admin.guard';
import { VendorService } from 'src/vendors/vendors.service';
import { UsersService } from 'src/Users/users.service';
import { AdminSigninDto } from './dtos/admin-signin.dto';
import { DenyVendorDto } from './dtos/deny-vendor.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from 'src/customer/dtos/user.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private adminAuthService: AdminAuthService,
    private vendorService: VendorService,
    private usersService: UsersService,   
  ) {}

  @Post('signin')
  signin(@Body() dto: AdminSigninDto) {
    const accessToken = this.adminAuthService.signin(dto.username, dto.password);
    return { accessToken };
  }

  // user related

  @Get('users')
  @UseGuards(AdminGuard)
  @Serialize(UserDto)
  allUsers() {
    return this.usersService.findAll();
  }

  @Delete('users/:id')
  @UseGuards(AdminGuard)
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // vendor related

  @Get('vendors/pending')
  @UseGuards(AdminGuard)
  getPendingVendors() {
    return this.vendorService.findPending();
  }

  @Patch('vendors/:id/approve')
  @UseGuards(AdminGuard)
  approveVendor(@Param('id') id: string) {
    return this.vendorService.approve(parseInt(id));
  }

  @Patch('vendors/:id/deny')
  @UseGuards(AdminGuard)
  denyVendor(@Param('id') id: string, @Body() dto: DenyVendorDto) {
    return this.vendorService.deny(parseInt(id), dto.reason);
  }
}