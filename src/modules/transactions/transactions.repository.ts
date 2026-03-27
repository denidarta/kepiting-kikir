import { Injectable } from '@nestjs/common';
import { transactions } from 'src/data/transactions.data';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsRepository {
  private readonly transactions: Transaction[] = [...transactions];
  private counter = this.transactions.length + 1;

  findAll(): Transaction[] {
    return this.transactions;
  }

  findById(id: number): Transaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  findByUserId(userId: number): Transaction[] {
    return this.transactions.filter((t) => t.userId === userId);
  }

  findByBookSku(bookSku: number): Transaction[] {
    return this.transactions.filter((t) => t.bookSku === bookSku);
  }

  create(dto: CreateTransactionDto, book: Transaction['book']): Transaction {
    const newTransaction: Transaction = {
      id: this.counter++,
      type: dto.type,
      bookSku: dto.bookSku,
      book,
      userId: dto.userId,
      transactedAt: dto.transactedAt ? new Date(dto.transactedAt) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  remove(id: number): Transaction | undefined {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    const [removed] = this.transactions.splice(index, 1);
    return removed;
  }
}
