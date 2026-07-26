import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsModule } from './vendors/vendors.module';
import { Vendor } from './vendors/entities/vendor.entity';
import { User } from './Users/user.entity';
import { AdminController } from './admin/admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './Users/users.module';
import { AdminModule } from './admin/admin.module';
import { CustomerProfile } from './customer/entites/customer-profile.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
}),
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      synchronize: true,
      entities: [User, Vendor, CustomerProfile],
}),
    VendorsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'thisIsMySecret',
      signOptions: {expiresIn: '30m'} 
}),
    AuthModule,
    UsersModule,
    AdminModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}