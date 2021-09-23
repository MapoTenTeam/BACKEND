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
    const { MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, TERMS } =
      authCredentialsPersonalDto;
    // const user = this.create({
    //   MBER_ID,
    //   PASSWORD,
    //   MBER_NM,
    //   MBER_EMAIL_ADRES,
    //   TERMS,
    // });
    const conn = getConnection();
    var sql =
      'INSERT INTO COMTNGNRLMBER (MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, TERMS, SBSCRB_DE) values(?,?,?,?,?,NOW())';
    var params = [MBER_ID, PASSWORD, MBER_NM, MBER_EMAIL_ADRES, TERMS];
    try {
      // await this.save(user);
      await conn.query(sql, params);
      return Object.assign({
        statusCode: 200,
        message: '개인 회원가입 성공',
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('중복된 MBER_ID');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // async createEnterpriseUser(
  //   AuthCredentialsPersonalDto: AuthCredentialsPersonalDto,
  // ): Promise<void> {
  //   const { userId, password, usernickname, bizrno, useremail } =
  //     AuthCredentialsPersonalDto;
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const user = this.create({
  //     userId,
  //     password: hashedPassword,
  //     usernickname,
  //     bizrno,
  //     useremail,
  //     usertype: 2,
  //   });
  //   try {
  //     await this.save(user);
  //   } catch (error) {
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       throw new ConflictException('Existing username');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
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
