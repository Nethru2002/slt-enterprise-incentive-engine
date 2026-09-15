import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const mockEmail = 'admin@slt.com.lk';
    const mockHashedPasswordMatch = loginDto.password === 'password123';

    if (loginDto.email !== mockEmail || !mockHashedPasswordMatch) {
      throw new UnauthorizedException('Invalid enterprise credentials.');
    }

    const payload = { sub: 'uuid-admin-01', email: loginDto.email, roles: ['ADMIN'] };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}