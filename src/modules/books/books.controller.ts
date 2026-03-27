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
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiResponse({
    status: 201,
    description: 'Book successfully created',
    schema: {
      example: {
        sku: 1005,
        title: 'The Clean Coder',
        author: 'Robert C. Martin',
        libraryId: 1,
        available: true,
        createdAt: '2024-07-01T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed — invalid or missing fields' })
  @ApiResponse({ status: 404, description: 'Library not found' })
  @ApiResponse({ status: 409, description: 'Book with this SKU already exists' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'List of all books',
    schema: {
      example: [
        {
          sku: 1001,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          libraryId: 1,
          available: true,
          createdAt: '2024-01-10T00:00:00.000Z',
          updatedAt: '2024-01-10T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':sku')
  @ApiOperation({ summary: 'Get book by SKU' })
  @ApiParam({ name: 'sku', example: 1001, description: 'Book SKU' })
  @ApiResponse({
    status: 200,
    description: 'Book found',
    schema: {
      example: {
        sku: 1001,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        libraryId: 1,
        available: true,
        createdAt: '2024-01-10T00:00:00.000Z',
        updatedAt: '2024-01-10T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'SKU must be a number' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('sku', ParseIntPipe) sku: number) {
    return this.booksService.findOne(sku);
  }

  @Get('library/:libraryId')
  @ApiOperation({ summary: 'Get all books in a library' })
  @ApiParam({ name: 'libraryId', example: 1, description: 'Library ID' })
  @ApiResponse({
    status: 200,
    description: 'List of books in the specified library',
    schema: {
      example: [
        {
          sku: 1001,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          libraryId: 1,
          available: true,
          createdAt: '2024-01-10T00:00:00.000Z',
          updatedAt: '2024-01-10T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Library ID must be a number' })
  @ApiResponse({ status: 404, description: 'Library not found' })
  findByLibrary(@Param('libraryId', ParseIntPipe) libraryId: number) {
    return this.booksService.findByLibrary(libraryId);
  }

  @Patch(':sku')
  @ApiOperation({ summary: 'Update book details' })
  @ApiParam({ name: 'sku', example: 1001, description: 'Book SKU' })
  @ApiResponse({
    status: 200,
    description: 'Book successfully updated',
    schema: {
      example: {
        sku: 1001,
        title: 'Clean Code — 2nd Edition',
        author: 'Robert C. Martin',
        libraryId: 1,
        available: true,
        createdAt: '2024-01-10T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'Book or Library not found' })
  update(
    @Param('sku', ParseIntPipe) sku: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(sku, updateBookDto);
  }

  @Delete(':sku')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'sku', example: 1001, description: 'Book SKU' })
  @ApiResponse({
    status: 200,
    description: 'Book successfully deleted',
    schema: { example: { message: 'Book with SKU 1001 successfully deleted' } },
  })
  @ApiResponse({ status: 400, description: 'SKU must be a number' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  remove(@Param('sku', ParseIntPipe) sku: number) {
    return this.booksService.remove(sku);
  }
}
