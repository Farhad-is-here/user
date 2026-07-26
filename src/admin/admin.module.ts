import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminGuard } from './admin.guard';
import { VendorsModule } from 'src/vendors/vendors.module';
import { UsersModule } from 'src/Users/users.module';

@Module({
  imports: [VendorsModule, UsersModule],
  controllers: [AdminController],
  providers: [AdminAuthService, AdminGuard],
})
export class AdminModule {}