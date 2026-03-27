import { Book } from 'src/modules/books/entities/book.entity';

export type TransactionType = 'borrow' | 'return';

export class Transaction {
  id: number;
  type: TransactionType;
  bookSku: number;
  book?: Book;
  userId: number;
  transactedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
