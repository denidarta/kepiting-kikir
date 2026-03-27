import { Injectable } from '@nestjs/common';
import { books } from 'src/data/books.data';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksRepository {
  private readonly books: Book[] = [...books];

  findAll(): Book[] {
    return this.books;
  }

  findBySku(sku: number): Book | undefined {
    return this.books.find((b) => b.sku === sku);
  }

  findByLibraryId(libraryId: number): Book[] {
    return this.books.filter((b) => b.libraryId === libraryId);
  }

  findByIsbn(isbn: string): Book[] {
    return this.books.filter((b) => b.isbn === isbn);
  }

  create(dto: CreateBookDto, library: Book['library']): Book {
    const newBook: Book = {
      sku: dto.sku,
      isbn: dto.isbn,
      title: dto.title,
      author: dto.author,
      libraryId: dto.libraryId,
      library,
      available: dto.available ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.books.push(newBook);
    return newBook;
  }

  update(
    sku: number,
    dto: UpdateBookDto,
    library?: Book['library'],
  ): Book | undefined {
    const index = this.books.findIndex((b) => b.sku === sku);
    if (index === -1) return undefined;

    this.books[index] = {
      ...this.books[index],
      ...dto,
      ...(library !== undefined && { library, libraryId: dto.libraryId }),
      updatedAt: new Date(),
    };
    return this.books[index];
  }

  remove(sku: number): Book | undefined {
    const index = this.books.findIndex((b) => b.sku === sku);
    if (index === -1) return undefined;

    const [removed] = this.books.splice(index, 1);
    return removed;
  }
}
