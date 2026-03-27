import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { books } from './books.data';

export const transactions: Transaction[] = [
  {
    id: 'trx-001',
    type: 'borrow',
    bookSku: 1002,
    book: books.find((b) => b.sku === 1002),
    userId: 'usr-001',
    transactedAt: new Date('2024-02-01'),
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'trx-002',
    type: 'return',
    bookSku: 1002,
    book: books.find((b) => b.sku === 1002),
    userId: 'usr-001',
    transactedAt: new Date('2024-02-14'),
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-02-14'),
  },
  {
    id: 'trx-003',
    type: 'borrow',
    bookSku: 1001,
    book: books.find((b) => b.sku === 1001),
    userId: 'usr-002',
    transactedAt: new Date('2024-03-01'),
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'trx-004',
    type: 'borrow',
    bookSku: 1003,
    book: books.find((b) => b.sku === 1003),
    userId: 'usr-003',
    transactedAt: new Date('2024-06-20'),
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-06-20'),
  },
];
