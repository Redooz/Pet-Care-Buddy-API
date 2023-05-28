import { DataSource } from 'typeorm';
import { Pet } from './pet.entity';

export const petProviders = [
  {
    provide: 'PET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pet),
    inject: ['DATA_SOURCE'],
  },
];
