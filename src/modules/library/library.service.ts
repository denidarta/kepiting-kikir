import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { LibraryRepository } from './library.repository';
import { LibraryEntity } from './entities/library.entity';

@Injectable()
export class LibraryService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  create(createLibraryDto: CreateLibraryDto): LibraryEntity {
    const existing = this.libraryRepository.findByName(createLibraryDto.name);
    if (existing) throw new ConflictException('Library name already exists');

    return this.libraryRepository.create(createLibraryDto);
  }

  findAll(): LibraryEntity[] {
    return this.libraryRepository.findAll();
  }

  findOne(id: number): LibraryEntity {
    const library = this.libraryRepository.findById(id);
    if (!library)
      throw new NotFoundException(`Library with id ${id} not found`);
    return library;
  }

  update(id: number, updateLibraryDto: UpdateLibraryDto): LibraryEntity {
    const updated = this.libraryRepository.update(id, updateLibraryDto);
    if (!updated)
      throw new NotFoundException(`Library with id ${id} not found`);
    return updated;
  }

  remove(id: number): { message: string } {
    const removed = this.libraryRepository.remove(id);
    if (!removed)
      throw new NotFoundException(`Library with id ${id} not found`);
    return { message: `Library with id ${id} successfully deleted` };
  }
}
