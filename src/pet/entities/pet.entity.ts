import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { typesPet } from '../constants/pet.enums';
@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  type: typesPet;
  @Column()
  description: string;
  @Column()
  pathologies: string;
  @ManyToOne(() => User, (user) => user.pets)
  user: User;
}
