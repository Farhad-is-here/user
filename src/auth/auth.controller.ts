import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { AuthSignupDto } from './dtos/auth-signup.dto';
import { UserDto } from 'src/customer/dtos/user.dto';
import { AuthSigninDto } from './dtos/auth-singin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/Users/user.entity';
import { ChangePasswordDto } from 'src/customer/dtos/changePassword.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: AuthSignupDto) {
    const user = await this.authService.signup(body.email, body.password, body.username);
    const accessToken = await this.authService.signToken(user);
    return {
      user: plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
      accessToken,
      message: 'signed up successfully',
    };
  }

  @Post('/signin')
  async signin(@Body() body: AuthSigninDto) {
    const user = await this.authService.signin(body.email, body.password);
    const accessToken = await this.authService.signToken(user);
    return {
      user: plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
      accessToken,
      message: 'signed in successfully',
    };
  }

  @Post('/signout')
  signOut() {
    return { message: 'Signed out' };
  }

  @ApiBearerAuth()
  @Patch('/changePassword')
  @UseGuards(AuthGuard)
  changePassword(@CurrentUser() user: User, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, dto);
  }
}