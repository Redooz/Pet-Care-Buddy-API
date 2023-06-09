import { Pet } from '../../pet/entities/pet.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
