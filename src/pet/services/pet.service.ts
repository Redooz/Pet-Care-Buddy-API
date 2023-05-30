import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';
import { CreatePetDto } from '../dtos/create-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @Inject('PET_REPOSITORY')
    private petRepository: Repository<Pet>,
  ) {}

  async findOne(petId: number) {
    const pet = await this.petRepository.findOne({
      where: { id: petId },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async create(newPet: CreatePetDto) {
    return await this.petRepository.save(newPet);
  }

  async update(petId: number, updateDto: any) {
    const pet = await this.findOne(petId);
    const updatedPet = {
      ...pet,
      name: updateDto.name,
      age: updateDto.age,
      type: updateDto.type,
      description: updateDto.description,
    };
    return await this.petRepository.save(updatedPet);
  }

  async delete(petId: number) {
    const pet = await this.findOne(petId);
    return await this.petRepository.delete(pet);
  }
}
