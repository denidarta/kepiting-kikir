import { Injectable } from '@nestjs/common';
import { libraries } from 'src/data/libraries.data';
import { LibraryEntity } from './entities/library.entity';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Injectable()
export class LibraryRepository {
  private readonly libraries: LibraryEntity[] = [...libraries];
  private counter = this.libraries.length + 1;

  findAll(): LibraryEntity[] {
    return this.libraries;
  }

  findById(id: number): LibraryEntity | undefined {
    return this.libraries.find((lib) => lib.id === id);
  }

  findByName(name: string): LibraryEntity | undefined {
    return this.libraries.find(
      (lib) => lib.name.toLowerCase() === name.toLowerCase(),
    );
  }

  create(dto: CreateLibraryDto): LibraryEntity {
    const newLibrary: LibraryEntity = {
      id: this.counter++,
      name: dto.name,
      address: dto.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.libraries.push(newLibrary);
    return newLibrary;
  }

  update(id: number, dto: UpdateLibraryDto): LibraryEntity | undefined {
    const index = this.libraries.findIndex((lib) => lib.id === id);
    if (index === -1) return undefined;

    this.libraries[index] = {
      ...this.libraries[index],
      ...dto,
      updatedAt: new Date(),
    };
    return this.libraries[index];
  }

  remove(id: number): LibraryEntity | undefined {
    const index = this.libraries.findIndex((lib) => lib.id === id);
    if (index === -1) return undefined;

    const [removed] = this.libraries.splice(index, 1);
    return removed;
  }
}
