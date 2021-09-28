import { EntityRepository, getConnection, Repository } from 'typeorm';
import { AuthCredentialsPersonalDto } from '../dtos/auth-credential.dto';
import { COMTNGNRLMBER } from '../entities/user-personal.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(COMTNGNRLMBER)
export class UserPersonalRepository extends Repository<COMTNGNRLMBER> {
  async createPersonalUser(
    authCredentialsPersonalDto: AuthCredentialsPersonalDto,
  ): Promise<void> {
    const { MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, EMAIL_VRFCT, TERMS } =
      authCredentialsPersonalDto;
    const MBER_STTUS = 'P';
    const PROFILE_STTUS = false;

    const conn = getConnection();
    var sql =
      'INSERT INTO COMTNGNRLMBER (MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, MBER_STTUS, EMAIL_VRFCT, TERMS, PROFILE_STTUS, SBSCRB_DE) values(?,?,?,?,?,?,?,?,NOW())';
    var params = [
      MBER_ID,
      PASSWORD,
      MBER_NM,
      MBER_EMAIL_ADRES,
      MBER_STTUS,
      EMAIL_VRFCT,
      TERMS,
      PROFILE_STTUS,
    ];
    try {
      if (EMAIL_VRFCT && TERMS == true) {
        await conn.query(sql, params);
        return Object.assign({
          statusCode: 201,
          message: '개인 회원가입 성공',
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
}
