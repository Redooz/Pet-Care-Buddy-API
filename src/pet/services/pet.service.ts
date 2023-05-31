import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';
import { CreatePetDto, UpdatePetDto } from '../dtos/create-pet.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class PetService {
  constructor(
    @Inject('PET_REPOSITORY')
    private petRepository: Repository<Pet>,
    private userService: UserService,
  ) {}

  async getAll(userId: number) {
    return this.petRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findOne(petId: number, userId: number) {
    const pet = await this.petRepository.findOne({
      where: {
        id: petId,
        user: {
          id: userId,
        },
      },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async create(newPet: CreatePetDto, userId: number) {
    const user = await this.userService.findOne(userId);

    const pet = this.petRepository.create(newPet);

    pet.user = user;

    return this.petRepository.save(pet);
  }

  async update(petId: number, updateDto: UpdatePetDto, userId: number) {
    const pet = await this.findOne(petId, userId);

    const updatedPet = Object.assign(pet, updateDto);
    return await this.petRepository.save(updatedPet);
  }

  async delete(petId: number, userId: number) {
    const pet = await this.findOne(petId, userId);

    return await this.petRepository.delete(pet);
  }
}
