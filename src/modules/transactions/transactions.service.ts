import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
import { BooksRepository } from '../books/books.repository';
import { UsersRepository } from '../users/users.repository';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly booksRepository: BooksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  create(createTransactionDto: CreateTransactionDto): Transaction {
    // Validasi user exists
    const user = this.usersRepository.findById(createTransactionDto.userId);
    if (!user)
      throw new NotFoundException(
        `User with id ${createTransactionDto.userId} not found`,
      );

    // Validasi book exists
    const book = this.booksRepository.findBySku(createTransactionDto.bookSku);
    if (!book)
      throw new NotFoundException(
        `Book with SKU ${createTransactionDto.bookSku} not found`,
      );

    // Validasi user tidak sedang meminjam judul yang sama (cek via ISBN)
    if (createTransactionDto.type === 'borrow') {
      const copiesOfSameTitle = this.booksRepository.findByIsbn(book.isbn);
      const skusOfSameTitle = copiesOfSameTitle.map((b) => b.sku);
      const activeBorrow =
        this.transactionsRepository.findActiveBorrowByUserAndIsbn(
          createTransactionDto.userId,
          skusOfSameTitle,
        );
      if (activeBorrow)
        throw new BadRequestException(
          `User with id ${createTransactionDto.userId} is already borrowing a copy of "${book.title}"`,
        );
    }

    // Validasi ketersediaan buku
    if (createTransactionDto.type === 'borrow' && !book.available)
      throw new BadRequestException(
        `Book with SKU ${createTransactionDto.bookSku} is not available for borrowing`,
      );

    if (createTransactionDto.type === 'return' && book.available)
      throw new BadRequestException(
        `Book with SKU ${createTransactionDto.bookSku} has not been borrowed`,
      );

    // Update ketersediaan buku
    this.booksRepository.update(book.sku, {
      available: createTransactionDto.type === 'return',
    });

    return this.transactionsRepository.create(createTransactionDto, book);
  }

  findAll(): Transaction[] {
    return this.transactionsRepository.findAll();
  }

  findOne(id: number): Transaction {
    const transaction = this.transactionsRepository.findById(id);
    if (!transaction)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return transaction;
  }

  findByUser(userId: number): Transaction[] {
    const user = this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    return this.transactionsRepository.findByUserId(userId);
  }

  findByBook(bookSku: number): Transaction[] {
    const book = this.booksRepository.findBySku(bookSku);
    if (!book)
      throw new NotFoundException(`Book with SKU ${bookSku} not found`);

    return this.transactionsRepository.findByBookSku(bookSku);
  }

  remove(id: number): { message: string } {
    const removed = this.transactionsRepository.remove(id);
    if (!removed)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return { message: `Transaction with id ${id} successfully deleted` };
  }
}
