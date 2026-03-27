import { LibraryEntity } from 'src/modules/library/entities/library.entity';

export class Book {
  sku: number;
  isbn: string;
  title: string;
  author: string;
  libraryId: number;
  library?: LibraryEntity;
  createdAt: Date;
  updatedAt: Date;
  available: boolean;
}
