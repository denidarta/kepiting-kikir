import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { books } from './books.data';

export const transactions: Transaction[] = [
  {
    id: 1,
    type: 'borrow',
    bookSku: 1002,
    book: books.find((b) => b.sku === 1002),
    userId: 1,
    transactedAt: new Date('2024-02-01'),
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 2,
    type: 'return',
    bookSku: 1002,
    book: books.find((b) => b.sku === 1002),
    userId: 1,
    transactedAt: new Date('2024-02-14'),
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-02-14'),
  },
  {
    id: 3,
    type: 'borrow',
    bookSku: 1001,
    book: books.find((b) => b.sku === 1001),
    userId: 2,
    transactedAt: new Date('2024-03-01'),
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 4,
    type: 'borrow',
    bookSku: 1003,
    book: books.find((b) => b.sku === 1003),
    userId: 3,
    transactedAt: new Date('2024-06-20'),
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-20'),
  },
];
