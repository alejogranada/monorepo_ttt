import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ username, password });
    return this.usersRepository.save(newUser);
  }

  // Método para encontrar un usuario por nombre de usuario
  async findUser(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }
}