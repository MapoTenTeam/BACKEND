import { EntityRepository, getConnection, Repository } from 'typeorm';
import { AuthCredentialsEnterpriseDto } from '../dtos/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { COMTNENTRPRSMBER } from '../entities/user-enterprise.entity';
import * as bcrypt from 'bcryptjs';

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
      BIZRNOAVAILABLE,
    } = authCredentialsEnterpriseDto;
    const ENTRPRS_MBER_STTUS = 'P';
    const PROFILE_STTUS = false;
    const BSNNM_APRVL_CODE = '10';

    console.log('PASSWORD', ENTRPRS_MBER_PASSWORD);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(ENTRPRS_MBER_PASSWORD, salt);
    console.log('hashedPassword', hashedPassword);

    const conn = getConnection();
    var sql =
      'INSERT INTO COMTNENTRPRSMBER (CMPNY_NM, ENTRPRS_MBER_ID, APPLCNT_EMAIL_ADRES, ENTRPRS_MBER_PASSWORD, APPLCNT_NM, BIZRNO, ENTRPRS_MBER_STTUS, EMAIL_VRFCT, TERMS, PROFILE_STTUS, BSNNM_APRVL_CODE, BIZRNOAVAILABLE, SBSCRB_DE) values(?,?,?,?,?,?,?,?,?,?,?,?,NOW())';
    var params = [
      CMPNY_NM,
      ENTRPRS_MBER_ID,
      APPLCNT_EMAIL_ADRES,
      hashedPassword,
      APPLCNT_NM,
      BIZRNO,
      ENTRPRS_MBER_STTUS,
      EMAIL_VRFCT,
      TERMS,
      PROFILE_STTUS,
      BSNNM_APRVL_CODE,
      BIZRNOAVAILABLE,
    ];
    try {
      if (EMAIL_VRFCT && TERMS == true && BIZRNOAVAILABLE == true) {
        await conn.query(sql, params);
        console.log('기업 회원가입 성공');
        return Object.assign({
          statusCode: 201,
          message: '기업 회원가입 성공',
        });
      } else {
        return Object.assign({
          statusCode: 406,
          message: '이메일 인증 or 이용약관 동의 or 사업자번호 확인 여부',
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
}
