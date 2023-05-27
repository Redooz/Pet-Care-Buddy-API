import { Param, Body, Controller, Post, Patch, Delete } from '@nestjs/common';
import { PetService } from '../services/pet.service';
import { CreatePetDto, UpdatePetDto } from '../dtos/create-pet.dto';

@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Post()
  async createPet(@Body() newPet: CreatePetDto) {
    return await this.petService.create(newPet);
  }
  @Patch(':id')
  async updatePet(@Param('id') petId: number, @Body() pet: UpdatePetDto) {
    return await this.petService.update(petId, pet);
  }

  @Delete(':id')
  async deletePet(@Param('id') petId: number) {
    return await this.petService.delete(petId);
  }
}
