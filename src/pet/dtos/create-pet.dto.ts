import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { typesPet } from '../constants/pet.enums';
export class CreatePetDto {
  @IsNumber()
  age: number;
  @IsString()
  name: string;
  description: string;
  @IsEnum(typesPet)
  type: typesPet;
}

export class UpdateUserDto extends PartialType(CreatePetDto) {}
