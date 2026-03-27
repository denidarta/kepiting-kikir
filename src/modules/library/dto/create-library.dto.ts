import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateLibraryDto {
  @ApiProperty({ example: 'Perpustakaan Pusat' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'Jl. Merdeka No. 1, Jakarta Pusat' })
  @IsString()
  @MinLength(5)
  address: string;
}
