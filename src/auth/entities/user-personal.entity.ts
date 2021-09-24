import { IsEmpty, IsNotEmpty } from 'class-validator';
import {
  Column,
  Double,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['MBER_ID'])
export class COMTNGNRLMBER {
  @PrimaryColumn()
  MBER_ID: string;

  @Column()
  PASSWORD: string;

  @Column({ nullable: true })
  PASSWORD_HINT: string;

  @Column({ nullable: true })
  PASSWORD_CNSR: string;

  @Column({ nullable: true })
  IHIDNUM: string;

  @Column({ nullable: true })
  MBER_NM: string;

  @Column({ nullable: true })
  ZIP: string;

  @Column({ nullable: true })
  ADRES: string;

  @Column({ nullable: true })
  AREA_NO: string;

  @Column({ nullable: true })
  MBER_STTUS: string;

  @Column({ nullable: true })
  DETAIL_ADRES: string;

  @Column({ nullable: true })
  END_TELNO: string;

  @Column({ nullable: true })
  MOBLPHON_NO: string;

  @Column({ nullable: true })
  GROUP_ID: string;

  @Column({ nullable: true })
  MBER_FXNUM: string;

  @Column()
  MBER_EMAIL_ADRES: string;

  @Column({ nullable: true })
  MIDDLE_TELNO: string;

  @Column()
  SBSCRB_DE: Date;

  @Column({ nullable: true })
  SECSN_DE: Date;

  @Column({ nullable: true })
  SEXDSTN_CODE: string;

  @Column({ nullable: true })
  ESNTL_ID: string;

  @Column({ nullable: true })
  LOCK_AT: string;

  @Column({ nullable: true })
  LOCK_CNT: string;

  @Column({ nullable: true })
  LOCK_LAST_PNTTM: Date;

  @Column({ nullable: true })
  CHG_PWD_LAST_PNTTM: Date;

  @Column()
  EMAIL_VRFCT: boolean;

  @Column()
  TERMS: boolean;
}
