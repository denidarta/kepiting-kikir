import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { LibraryModule } from '../library/library.module';

@Module({
  imports: [LibraryModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksRepository],
})
export class BooksModule {}
