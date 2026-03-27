import { Book } from 'src/modules/books/entities/book.entity';

export type TransactionType = 'borrow' | 'return';

export class Transaction {
  id: string;
  type: TransactionType;
  bookSku: number;
  book?: Book;
  userId: string;
  transactedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
