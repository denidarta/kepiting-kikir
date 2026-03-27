import { Book } from 'src/modules/books/entities/book.entity';
import { libraries } from './libraries.data';

export const books: Book[] = [
  {
    sku: 1001,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    libraryId: 1,
    library: libraries[0],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    available: true,
  },
  {
    sku: 1002,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    libraryId: 1,
    library: libraries[0],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    available: false,
  },
  {
    sku: 1003,
    title: 'Design Patterns',
    author: 'Gang of Four',
    libraryId: 2,
    library: libraries[1],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
    available: true,
  },
  {
    sku: 1004,
    title: 'You Don`t Know JS',
    author: 'Kyle Simpson',
    libraryId: 3,
    library: libraries[2],
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15'),
    available: true,
  },
];
