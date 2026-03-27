import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':sku')
  @ApiOperation({ summary: 'Get book by SKU' })
  findOne(@Param('sku', ParseIntPipe) sku: number) {
    return this.booksService.findOne(sku);
  }

  @Get('library/:libraryId')
  @ApiOperation({ summary: 'Get all books in a library' })
  findByLibrary(@Param('libraryId', ParseIntPipe) libraryId: number) {
    return this.booksService.findByLibrary(libraryId);
  }

  @Patch(':sku')
  @ApiOperation({ summary: 'Update book details' })
  update(
    @Param('sku', ParseIntPipe) sku: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(sku, updateBookDto);
  }

  @Delete(':sku')
  @ApiOperation({ summary: 'Delete a book' })
  remove(@Param('sku', ParseIntPipe) sku: number) {
    return this.booksService.remove(sku);
  }
}
