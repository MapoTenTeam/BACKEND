import { EntityRepository, getConnection, Repository } from 'typeorm';
import {
  AuthCredentialsEnterpriseDto,
  AuthCredentialsPersonalDto,
} from '../dtos/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { COMTNENTRPRSMBER } from '../entities/user-enterprise.entity';

@EntityRepository(COMTNENTRPRSMBER)
export class UserEnterpriseRepository extends Repository<COMTNENTRPRSMBER> {
  async createEnterpriseUser(
    authCredentialsEnterpriseDto: AuthCredentialsEnterpriseDto,
  ): Promise<void> {
    const {
      CMPNY_NM,
      ENTRPRS_MBER_ID,
      APPLCNT_EMAIL_ADRES,
      ENTRPRS_MBER_PASSWORD,
      APPLCNT_NM,
      BIZRNO,
      EMAIL_VRFCT,
      TERMS,
    } = authCredentialsEnterpriseDto;
    const ENTRPRS_MBER_STTUS = 'P';
    const PROFILE_STTUS = false;
    const BSNNM_APRVL_CODE = '10';

    const conn = getConnection();
    var sql =
      'INSERT INTO COMTNENTRPRSMBER (CMPNY_NM, ENTRPRS_MBER_ID, APPLCNT_EMAIL_ADRES, ENTRPRS_MBER_PASSWORD, APPLCNT_NM, BIZRNO, ENTRPRS_MBER_STTUS, EMAIL_VRFCT, TERMS, PROFILE_STTUS, BSNNM_APRVL_CODE, SBSCRB_DE) values(?,?,?,?,?,?,?,?,?,?,?,NOW())';
    var params = [
      CMPNY_NM,
      ENTRPRS_MBER_ID,
      APPLCNT_EMAIL_ADRES,
      ENTRPRS_MBER_PASSWORD,
      APPLCNT_NM,
      BIZRNO,
      ENTRPRS_MBER_STTUS,
      EMAIL_VRFCT,
      TERMS,
      PROFILE_STTUS,
      BSNNM_APRVL_CODE,
    ];
    try {
      if (EMAIL_VRFCT && TERMS == true) {
        await conn.query(sql, params);
        return Object.assign({
          statusCode: 201,
          message: '기업 회원가입 성공',
        });
      } else {
        return Object.assign({
          statusCode: 406,
          message: '이메일 인증 or 이용약관 동의 실패',
        });
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('중복된 MBER_ID');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // async createPersonalUserDetail(
  //   createPersonalUserDto: CreatePersonalUserDto,
  //   user: User,
  // ): Promise<UserPersonal> {
  //   const { description } = createPersonalUserDto;
  //   const personalUser = this.create({
  //     description,
  //     user,
  //   });
  //   await this.save(personalUser);
  //   return personalUser;
  // }
}
