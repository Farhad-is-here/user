import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/Users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/Users/users.service';
import { CustomerService } from './customer.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UpdateCustomerDto } from './dtos/updateCustomer.dto';
import { UpdateCustomerProfileDto } from './dtos/update-customer-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private usersService: UsersService,
    private customerService: CustomerService,
  ) {}

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }


  // edit username and email
  @ApiBearerAuth()
  @Patch('/account')
  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  updateAccount(@CurrentUser() user: User, @Body() body: UpdateCustomerDto) {
    return this.usersService.update(user.id, body);
  }


  // edit address and phone
  @ApiBearerAuth()
  @Patch('/profile')
  @UseGuards(AuthGuard)
  async updateProfile(@CurrentUser() user: User, @Body() dto: UpdateCustomerProfileDto) {
    return this.customerService.updateProfile(user.id, dto);
  }

  @ApiBearerAuth()
  @Get('/profile')
  @UseGuards(AuthGuard)
  async myProfile(@CurrentUser() user: User) {
    return this.customerService.findByUserId(user.id);
  }
}