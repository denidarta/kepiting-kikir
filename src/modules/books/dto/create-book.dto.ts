import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 1001 })
  @IsNumber()
  @Min(1)
  sku: number;

  @ApiProperty({
    example: '978-0132350884',
    description: 'ISBN — shared across all physical copies of the same title',
  })
  @IsString()
  isbn: string;

  @ApiProperty({ example: 'Clean Code' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({ example: 'Robert C. Martin' })
  @IsString()
  @MinLength(1)
  author: string;

  @ApiProperty({
    example: 1,
    description: 'Library ID where the book is located',
  })
  @IsNumber()
  libraryId: number;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
