import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './jobs-status.enum';

// @Entity()
// export class Board {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   description: string;

//   @Column()
//   status: BoardStatus;

//   @ManyToOne((type) => User, (user) => user.boards)
//   user: User;
// }
