import { User } from 'src/modules/users/entities/user.entity';

export const users: User[] = [
  {
    id: 'usr-001',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 'usr-002',
    name: 'Siti Rahayu',
    email: 'siti@example.com',
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-02-14'),
  },
  {
    id: 'usr-003',
    name: 'Andi Wijaya',
    email: 'andi@example.com',
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-05-20'),
  },
];
