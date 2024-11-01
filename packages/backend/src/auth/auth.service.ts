import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser(username, hashedPassword);
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findUser(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { username: user.username, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}