import { LibraryEntity } from 'src/modules/library/entities/library.entity';

export const libraries: LibraryEntity[] = [
  {
    id: 1,
    name: 'Perpustakaan Pusat',
    address: 'Jl. Merdeka No. 1, Jakarta Pusat',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Perpustakaan Cabang Selatan',
    address: 'Jl. Gatot Subroto No. 45, Jakarta Selatan',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 3,
    name: 'Perpustakaan Cabang Timur',
    address: 'Jl. Ahmad Yani No. 12, Jakarta Timur',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10'),
  },
];
