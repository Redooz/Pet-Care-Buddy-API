import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CreatePetDto, UpdatePetDto } from '../dtos/create-pet.dto';
import { PetService } from '../services/pet.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';

@ApiTags('pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({ status: 200, description: 'Pets retrieved successfully' })
  @Get()
  async getAll(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return await this.petService.getAll(user.sub);
  }

  @ApiOperation({ summary: 'Get a pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  @Get(':id')
  async getOne(@Req() req: Request, @Param('id') petId: number) {
    const user = req.user as PayloadToken;
    return await this.petService.findOne(petId, user.sub);
  }

  @ApiOperation({ summary: 'Create a new pet' })
  @ApiResponse({ status: 201, description: 'Pet created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post()
  async createPet(@Req() req: Request, @Body() newPet: CreatePetDto) {
    const user = req.user as PayloadToken;
    return await this.petService.create(newPet, user.sub);
  }

  @ApiOperation({ summary: 'Update a pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 200, description: 'Pet updated successfully' })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  @Patch(':id')
  async updatePet(
    @Req() req: Request,
    @Param('id') petId: number,
    @Body() pet: UpdatePetDto,
  ) {
    const user = req.user as PayloadToken;
    return await this.petService.update(petId, pet, user.sub);
  }

  @ApiOperation({ summary: 'Delete a pet by ID' })
  @ApiParam({ name: 'id', description: 'Pet ID' })
  @ApiResponse({ status: 204, description: 'Pet deleted successfully' })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  @Delete(':id')
  async deletePet(@Req() req: Request, @Param('id') petId: number) {
    const user = req.user as PayloadToken;
    return await this.petService.delete(petId, user.sub);
  }
}
