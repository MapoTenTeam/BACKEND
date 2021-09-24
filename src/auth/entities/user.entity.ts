// import { Board } from 'src/jobs/jobs.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEnterprise } from './user-enterprise.entity';

// @Entity()
@Unique(['userId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  usernickname: string;

  @Column()
  useremail: string;

  @Column()
  usertype: number;

  @Column({ default: null })
  bizrno: string;

  // @OneToOne((type) => UserPersonal, (userPersonal) => userPersonal.user, {
  //   nullable: true,
  // })
  // @JoinColumn()
  // userPersonal: UserPersonal;

  // @OneToOne((type) => UserEnterprise, (userEnterprise) => userEnterprise.user, {
  //   nullable: true,
  // })
  // @JoinColumn()
  // userEnterprise: UserEnterprise;

  // @OneToMany((type) => Board, (board) => board.user, { eager: true })
  // boards: Board[];
}
