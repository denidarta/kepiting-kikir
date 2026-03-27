import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { LibraryRepository } from '../library/library.repository';
import { LibraryEntity } from '../library/entities/library.entity';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly libraryRepository: LibraryRepository,
  ) {}

  create(createBookDto: CreateBookDto): Book {
    const existing = this.booksRepository.findBySku(createBookDto.sku);
    if (existing)
      throw new ConflictException(
        `Book with SKU ${createBookDto.sku} already exists`,
      );

    const library = this.libraryRepository.findById(createBookDto.libraryId);
    if (!library)
      throw new NotFoundException(
        `Library with id ${createBookDto.libraryId} not found`,
      );

    return this.booksRepository.create(createBookDto, library);
  }

  findAll(): Book[] {
    return this.booksRepository.findAll();
  }

  findOne(sku: number): Book {
    const book = this.booksRepository.findBySku(sku);
    if (!book) throw new NotFoundException(`Book with SKU ${sku} not found`);
    return book;
  }

  findByLibrary(libraryId: number): Book[] {
    const library = this.libraryRepository.findById(libraryId);
    if (!library)
      throw new NotFoundException(`Library with id ${libraryId} not found`);

    return this.booksRepository.findByLibraryId(libraryId);
  }

  update(sku: number, updateBookDto: UpdateBookDto): Book {
    let library: LibraryEntity | undefined = undefined;
    if (updateBookDto.libraryId !== undefined) {
      library = this.libraryRepository.findById(updateBookDto.libraryId);
      if (!library)
        throw new NotFoundException(
          `Library with id ${updateBookDto.libraryId} not found`,
        );
    }

    const updated = this.booksRepository.update(sku, updateBookDto, library);
    if (!updated) throw new NotFoundException(`Book with SKU ${sku} not found`);
    return updated;
  }

  remove(sku: number): { message: string } {
    const removed = this.booksRepository.remove(sku);
    if (!removed) throw new NotFoundException(`Book with SKU ${sku} not found`);
    return { message: `Book with SKU ${sku} successfully deleted` };
  }
}
