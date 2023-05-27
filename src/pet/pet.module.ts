import { Module } from '@nestjs/common';
import { PetService } from './services/pet.service';
import { petProviders } from './entities/pet.providers';
import { PetController } from './controllers/pet.controller';

@Module({
  providers: [PetService, ...petProviders],
  controllers: [PetController],
})
export class PetModule {}
