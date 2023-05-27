import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { typesPet } from '../constants/pet.enums';
export class CreatePetDto {
  @IsNumber()
  age: number;
  @IsString()
  name: string;
  description: string;
  pathologies: string;
  @IsEnum(typesPet)
  type: typesPet;
}

export class UpdatePetDto extends PartialType(CreatePetDto) {}
