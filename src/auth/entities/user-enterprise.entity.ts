import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['ENTRPRS_MBER_ID'])
export class COMTNENTRPRSMBER {
  @PrimaryColumn()
  ENTRPRS_MBER_ID: string;

  @Column()
  ENTRPRS_SE_CODE: string;

  @Column()
  BIZRNO: string;

  @Column({ nullable: true })
  JURIRNO: string;

  @Column()
  CMPNY_NM: string;

  @Column({ nullable: true })
  CEO: string;

  @Column({ nullable: true })
  CXFC: string;

  @Column({ nullable: true })
  ZIP: string;

  @Column({ nullable: true })
  ADRES: string;

  @Column({ nullable: true })
  ENTRPRS_MIDDLE_TELNO: string;

  @Column({ nullable: true })
  FXNUM: string;

  @Column({ nullable: true })
  INDUTY_CODE: string;

  @Column()
  APPLCNT_NM: string;

  @Column({ nullable: true })
  APPLCNT_IHIDNUM: string;

  @Column()
  SBSCRB_DE: string;

  @Column({ nullable: true })
  SECSN_DE: string;

  @Column()
  ENTRPRS_MBER_STTUS: boolean;

  @Column({ nullable: true })
  ENTRPRS_MBER_PASSWORD: string;

  @Column({ nullable: true })
  ENTRPRS_MBER_PASSWORD_HINT: string;

  @Column({ nullable: true })
  ENTRPRS_MBER_PASSWORD_CNSR: string;

  @Column({ nullable: true })
  GROUP_ID: string;

  @Column({ nullable: true })
  DETAIL_ADRES: string;

  @Column({ nullable: true })
  ENTRPRS_END_TELNO: string;

  @Column({ nullable: true })
  AREA_NO: string;

  @Column()
  APPLCNT_EMAIL_ADRES: string;

  @Column({ nullable: true })
  ESNTL_ID: string;

  @Column({ nullable: true })
  LOCK_AT: string;

  @Column({ nullable: true })
  LOCK_CNT: string;

  @Column({ nullable: true })
  LOCK_LAST_PNTTM: string;

  @Column({ nullable: true })
  CHG_PWD_LAST_PNTTM: string;

  @Column({ nullable: true })
  INDUTY: string;

  @Column({ nullable: true })
  CEO_EMAIL_ADRES: string;

  @Column({ nullable: true })
  BSNNM_APRVL: boolean;

  @Column()
  EMAIL_VRFCT: boolean;

  @Column()
  TERMS: boolean;
}
