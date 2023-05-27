import { Module } from '@nestjs/common';
import { PetService } from './services/pet.service';
import { petProviders } from './entities/pet.providers';

@Module({
  providers: [PetService, ...petProviders],
})
export class PetModule {}
