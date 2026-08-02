import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(private jwtService: JwtService) {}

  signin(username: string, password: string) {
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    return this.jwtService.sign({
      role: 'admin',
      username
    });
  }
}