import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty({ enum: ['borrow', 'return'], example: 'borrow' })
  @IsEnum(['borrow', 'return'])
  type: TransactionType;

  @ApiProperty({ example: 1001, description: 'Book SKU' })
  @IsNumber()
  bookSku: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    required: false,
    description: 'Defaults to current date if not provided',
  })
  @IsDateString()
  @IsOptional()
  transactedAt?: string;
}
