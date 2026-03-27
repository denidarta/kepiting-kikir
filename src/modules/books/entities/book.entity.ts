import { Library } from 'src/modules/library/entities/library.entity';

export class Book {
  sku: number;
  title: string;
  author: string;
  libraryId: number;
  library?: Library;
  createdAt: Date;
  updatedAt: Date;
  available: boolean;
}
