import { Injectable } from '@nestjs/common';
import { users } from 'src/data/users.data';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [...users];
  private counter = this.users.length + 1;

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  create(dto: CreateUserDto): User {
    const newUser: User = {
      id: this.counter++,
      name: dto.name,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    this.users[index] = {
      ...this.users[index],
      ...dto,
      updatedAt: new Date(),
    };
    return this.users[index];
  }

  remove(id: number): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    const [removed] = this.users.splice(index, 1);
    return removed;
  }
}
