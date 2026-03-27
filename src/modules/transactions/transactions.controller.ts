import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a borrow or return transaction',
    description: `
Membuat transaksi peminjaman atau pengembalian buku.

**Aturan Borrow:**
- Buku harus tersedia (available: true)
- User tidak boleh sedang meminjam judul yang sama, meskipun dari copy yang berbeda (diidentifikasi via ISBN)

**Aturan Return:**
- Buku harus dalam status dipinjam (available: false)

**Contoh skenario ISBN:**
SKU 1002 dan 1003 adalah dua copy fisik dari judul yang sama (ISBN identik).
Jika user sudah meminjam SKU 1002, maka user tersebut tidak bisa meminjam SKU 1003 sebelum mengembalikan SKU 1002.
    `.trim(),
  })
  @ApiResponse({
    status: 201,
    description: 'Transaction successfully created',
    schema: {
      example: {
        id: 5,
        type: 'borrow',
        bookSku: 1001,
        userId: 1,
        transactedAt: '2024-07-01T00:00:00.000Z',
        createdAt: '2024-07-01T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Book not available / User already borrowing the same title (same ISBN) / Book has not been borrowed',
  })
  @ApiResponse({ status: 404, description: 'User or Book not found' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of all transactions',
    schema: {
      example: [
        {
          id: 1,
          type: 'borrow',
          bookSku: 1002,
          userId: 1,
          transactedAt: '2024-02-01T00:00:00.000Z',
          createdAt: '2024-02-01T00:00:00.000Z',
          updatedAt: '2024-02-01T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found',
    schema: {
      example: {
        id: 1,
        type: 'borrow',
        bookSku: 1002,
        userId: 1,
        transactedAt: '2024-02-01T00:00:00.000Z',
        createdAt: '2024-02-01T00:00:00.000Z',
        updatedAt: '2024-02-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'ID must be a number' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all transactions by user' })
  @ApiParam({ name: 'userId', example: 1, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions for the specified user',
    schema: {
      example: [
        {
          id: 1,
          type: 'borrow',
          bookSku: 1002,
          userId: 1,
          transactedAt: '2024-02-01T00:00:00.000Z',
          createdAt: '2024-02-01T00:00:00.000Z',
          updatedAt: '2024-02-01T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'User ID must be a number' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.transactionsService.findByUser(userId);
  }

  @Get('book/:bookSku')
  @ApiOperation({ summary: 'Get all transactions by book SKU' })
  @ApiParam({ name: 'bookSku', example: 1001, description: 'Book SKU' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions for the specified book',
    schema: {
      example: [
        {
          id: 3,
          type: 'borrow',
          bookSku: 1001,
          userId: 2,
          transactedAt: '2024-03-01T00:00:00.000Z',
          createdAt: '2024-03-01T00:00:00.000Z',
          updatedAt: '2024-03-01T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Book SKU must be a number' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findByBook(@Param('bookSku', ParseIntPipe) bookSku: number) {
    return this.transactionsService.findByBook(bookSku);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'id', example: 1, description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction successfully deleted',
    schema: {
      example: { message: 'Transaction with id 1 successfully deleted' },
    },
  })
  @ApiResponse({ status: 400, description: 'ID must be a number' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.remove(id);
  }
}
