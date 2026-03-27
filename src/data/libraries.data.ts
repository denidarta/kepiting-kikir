import { Library } from 'src/modules/library/entities/library.entity';

export const libraries: Library[] = [
  {
    id: 'lib-001',
    name: 'Perpustakaan Pusat',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'lib-002',
    name: 'Perpustakaan Cabang Selatan',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'lib-003',
    name: 'Perpustakaan Cabang Timur',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10'),
  },
];
