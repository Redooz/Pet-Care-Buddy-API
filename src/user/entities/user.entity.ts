import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';
import { Exclude } from 'class-transformer';

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
