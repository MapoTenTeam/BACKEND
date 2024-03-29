import { EntityRepository, getConnection, Repository } from 'typeorm';
import { AuthCredentialsPersonalDto } from '../dtos/auth-credential.dto';
import { COMTNGNRLMBER } from '../entities/user-personal.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(COMTNGNRLMBER)
export class UserPersonalRepository extends Repository<COMTNGNRLMBER> {
  private logger = new Logger('createPersonalUser');
  async createPersonalUser(
    authCredentialsPersonalDto: AuthCredentialsPersonalDto,
  ): Promise<void> {
    const { MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, EMAIL_VRFCT, TERMS } =
      authCredentialsPersonalDto;
    const MBER_STTUS = 'P';
    const PROFILE_STTUS = false;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    const conn = getConnection();
    var sql =
      'INSERT INTO COMTNGNRLMBER (MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, MBER_STTUS, EMAIL_VRFCT, TERMS, PROFILE_STTUS, SBSCRB_DE) values(?,?,?,?,?,?,?,?,NOW())';
    var params = [
      MBER_ID,
      hashedPassword,
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
        this.logger.log(`개인 회원가입 성공`);
        return Object.assign({
          statusCode: 201,
          message: '개인 회원가입 성공',
        });
      } else {
        this.logger.warn(`이메일 인증 or 이용약관 동의 실패`);
        return Object.assign({
          statusCode: 406,
          message: '이메일 인증 or 이용약관 동의 실패',
        });
      }
    } catch (error) {
      this.logger.error(`개인 회원가입 실패
      Error: ${error}`);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('중복된 MBER_ID');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
