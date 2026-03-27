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
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new library' })
  @ApiResponse({
    status: 201,
    description: 'Library successfully created',
    schema: {
      example: {
        id: 4,
        name: 'Perpustakaan Cabang Barat',
        address: 'Jl. Sudirman No. 99, Jakarta Barat',
        createdAt: '2024-07-01T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed — invalid or missing fields' })
  @ApiResponse({ status: 409, description: 'Library name already exists' })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all libraries' })
  @ApiResponse({
    status: 200,
    description: 'List of all libraries',
    schema: {
      example: [
        {
          id: 1,
          name: 'Perpustakaan Pusat',
          address: 'Jl. Merdeka No. 1, Jakarta Pusat',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.libraryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get library by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Library ID' })
  @ApiResponse({
    status: 200,
    description: 'Library found',
    schema: {
      example: {
        id: 1,
        name: 'Perpustakaan Pusat',
        address: 'Jl. Merdeka No. 1, Jakarta Pusat',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'ID must be a number' })
  @ApiResponse({ status: 404, description: 'Library not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update library name or address' })
  @ApiParam({ name: 'id', example: 1, description: 'Library ID' })
  @ApiResponse({
    status: 200,
    description: 'Library successfully updated',
    schema: {
      example: {
        id: 1,
        name: 'Perpustakaan Pusat Updated',
        address: 'Jl. Merdeka No. 10, Jakarta Pusat',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-07-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 404, description: 'Library not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibraryDto: UpdateLibraryDto,
  ) {
    return this.libraryService.update(id, updateLibraryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a library' })
  @ApiParam({ name: 'id', example: 1, description: 'Library ID' })
  @ApiResponse({
    status: 200,
    description: 'Library successfully deleted',
    schema: { example: { message: 'Library with id 1 successfully deleted' } },
  })
  @ApiResponse({ status: 400, description: 'ID must be a number' })
  @ApiResponse({ status: 404, description: 'Library not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.remove(id);
  }
}
