import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
