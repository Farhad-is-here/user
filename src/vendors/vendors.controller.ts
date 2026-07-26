import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { VendorService } from './vendors.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { VendorGuard } from './vendor.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/Users/user.entity';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { VendorDto } from './dto/vendor.dto';
import { VendorApplyDto } from './dto/vendor-apply.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('vendor')
export class VendorsController {
  constructor(private readonly vendorService: VendorService) {}
  

  // edit storeName address and phone
  @ApiBearerAuth()
  @Patch('/me')
  @UseGuards(AuthGuard, VendorGuard)
  @Serialize(VendorDto)
  async updateMyStore(@CurrentUser() user: User, @Body() dto: UpdateVendorDto) {
    return this.vendorService.update(user.id, dto);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(AuthGuard, VendorGuard)
  @Serialize(VendorDto)
  async myStore(@CurrentUser() user: User) {
    return this.vendorService.findByUserId(user.id);
  }

  @ApiBearerAuth()
  @Post('apply')
  @UseGuards(AuthGuard)
  async apply(@CurrentUser() user: User, @Body() dto: VendorApplyDto) {
    return this.vendorService.apply(user, dto);
}
}