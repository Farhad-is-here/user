import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InternalService } from './internal.service';

@Controller('internal')
export class InternalController {
  constructor(private internalService: InternalService) {}

@Get('users/:userId/profile')
getProfile(@Param('userId', ParseIntPipe) userId: number) {
  return this.internalService.getUserProfile(userId);
}
}