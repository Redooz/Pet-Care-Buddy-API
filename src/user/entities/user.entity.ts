import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
