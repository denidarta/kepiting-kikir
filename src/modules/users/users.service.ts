import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): User {
    const existing = this.usersRepository.findByEmail(createUserDto.email);
    if (existing) throw new ConflictException('Email already in use');

    return this.usersRepository.create(createUserDto);
  }

  findAll(): User[] {
    return this.usersRepository.findAll();
  }

  findOne(id: number): User {
    const user = this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const updated = this.usersRepository.update(id, updateUserDto);
    if (!updated) throw new NotFoundException(`User with id ${id} not found`);
    return updated;
  }

  remove(id: number): User {
    const removed = this.usersRepository.remove(id);
    if (!removed) throw new NotFoundException(`User with id ${id} not found`);
    return removed;
  }
}
