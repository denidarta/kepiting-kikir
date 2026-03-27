import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a borrow or return transaction' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all transactions by user' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.transactionsService.findByUser(userId);
  }

  @Get('book/:bookSku')
  @ApiOperation({ summary: 'Get all transactions by book SKU' })
  findByBook(@Param('bookSku', ParseIntPipe) bookSku: number) {
    return this.transactionsService.findByBook(bookSku);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.remove(id);
  }
}
