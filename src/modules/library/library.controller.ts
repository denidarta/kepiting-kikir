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
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new library' })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all libraries' })
  findAll() {
    return this.libraryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get library by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update library name or address' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibraryDto: UpdateLibraryDto,
  ) {
    return this.libraryService.update(id, updateLibraryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a library' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.remove(id);
  }
}
