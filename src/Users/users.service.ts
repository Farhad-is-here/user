import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, username: string) {
    const user = this.repo.create({ email, password, username });
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.repo.remove(user);
  }

  async update(id: number, attrs: Partial<User>) {
  const user = await this.findOne(id);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (attrs.email && attrs.email !== user.email) {
    const existing = await this.findByEmail(attrs.email);
    if (existing.length) {
      throw new BadRequestException('email in use');
    }
  }

  Object.assign(user, attrs);
  return this.repo.save(user);
}


}