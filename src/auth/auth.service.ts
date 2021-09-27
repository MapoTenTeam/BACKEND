import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import {
  GetUserByIdDto,
  GetUserByIdFindInputDto,
  GetUserByIdFindOutputDto,
} from './dtos/response/getUserById.dto';
import { GetUserByEmailDto } from './dtos/response/getUserByEmail.dto';
import {
  AuthCredentialsEnterpriseDto,
  AuthCredentialsPersonalDto,
  LoginInputDto,
  PasswordChangeInputDto,
  TermsOutputDto,
  UserByEmailInputDto,
} from './dtos/auth-credential.dto';
import { UserPersonalRepository } from './repository/user-personal-repository';
import { UserEnterpriseRepository } from './repository/user-enterprise-repository';
import { getConnection } from 'typeorm';
import { GetUserByBizrnoDto } from './dtos/response/getUserByBizrno.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { GetUserByPasswordFindInputDto } from './dtos/response/getUserByPassword.dto';
import { ProfilePersonalInputDto } from './dtos/personalUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserPersonalRepository)
    private userPersonalRepository: UserPersonalRepository,
    // private userPersonalDetailRepository: UserPersonalDetailRepository,
    // private userEnterpriseDetailRepository: UserEnterpriseDetailRepository,
    private jwtService: JwtService,
    private mailerService: MailerService,

    @InjectRepository(UserEnterpriseRepository)
    private userEnterpriseRepository: UserEnterpriseRepository,
  ) {}

  async getUserById(param: { userid: string }): Promise<GetUserByIdDto> {
    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT USER_ID FROM COMVNUSERMASTER WHERE USER_ID='${param.userid}'`,
    );

    return found
      ? Object.assign({
          statusCode: 200,
          message: '유저 아이디가 존재합니다.',
          isDuplicate: true,
        })
      : Object.assign({
          statusCode: 200,
          message: '유저 아이디가 없습니다.',
          isDuplicate: false,
        });
  }

  async getUserByEmail(
    userByEmailInputDto: UserByEmailInputDto,
  ): Promise<GetUserByEmailDto> {
    const { email } = userByEmailInputDto;
    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT EMAIL_ADRES FROM COMVNUSERMASTER WHERE EMAIL_ADRES='${email}' AND USER_STTUS='P'`,
    );

    return found
      ? Object.assign({
          statusCode: 200,
          message: '유저 이메일이 존재합니다',
          isDuplicate: true,
        })
      : Object.assign({
          statusCode: 200,
          message: '유저 이메일이 없습니다.',
          isDuplicate: false,
        });
  }

  async getUserBybizrno(param: {
    bizrno: string;
  }): Promise<GetUserByBizrnoDto> {
    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT BIZRNO FROM COMTNENTRPRSMBER WHERE BIZRNO='${param.bizrno}' AND USER_STTUS='P'`,
    );

    return found
      ? Object.assign({
          statusCode: 200,
          message: '사업자등록번호가 존재합니다.',
          isDuplicate: true,
        })
      : Object.assign({
          statusCode: 200,
          message: '사업자등록번호가 없습니다.',
          isDuplicate: false,
        });
  }

  async getUserByIdFind(
    getUserByIdFindInputDto: GetUserByIdFindInputDto,
  ): Promise<GetUserByIdFindOutputDto> {
    const { USER_NM, USER_EMAIL } = getUserByIdFindInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT USER_ID FROM COMVNUSERMASTER WHERE USER_NM='${USER_NM}' AND EMAIL_ADRES='${USER_EMAIL}' AND USER_STTUS='P'`,
    );

    return found
      ? Object.assign({
          statusCode: 200,
          message: '유저 아이디 조회 성공',
          userId: found.USER_ID,
        })
      : Object.assign({
          statusCode: 200,
          message: '가입된 회원정보가 없습니다.',
        });
  }

  async getpersonalByPasswordFind(
    getUserByPasswordFindInputDto: GetUserByPasswordFindInputDto,
  ) {
    const { USER_ID, USER_EMAIL } = getUserByPasswordFindInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT MBER_EMAIL_ADRES FROM COMTNGNRLMBER WHERE MBER_ID='${USER_ID}' AND MBER_EMAIL_ADRES='${USER_EMAIL}' AND MBER_STTUS='P'`,
    );

    if (found) {
      try {
        const number: number =
          Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        await this.mailerService.sendMail({
          to: found.MBER_EMAIL_ADRES, // list of receivers
          from: process.env.EMAIL_ADRES, // sender address
          subject: '이메일 인증 요청 메일입니다.', // Subject line
          html: '6자리 인증 코드 : ' + `<b> ${number}</b>`, // HTML body content
        });
        const password = String(number);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await conn.query(
          `UPDATE COMTNGNRLMBER SET PASSWORD='${hashedPassword}' WHERE MBER_ID='${USER_ID}'`,
        );

        return Object.assign({
          statusCode: 201,
          message: '임시 비밀번호 생성 성공',
        });
      } catch (err) {}
    } else {
      return Object.assign({
        statusCode: 200,
        message: '가입된 회원정보가 없습니다.',
      });
    }
  }

  async getenterpriseByPasswordFind(
    getUserByPasswordFindInputDto: GetUserByPasswordFindInputDto,
  ) {
    const { USER_ID, USER_EMAIL } = getUserByPasswordFindInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT APPLCNT_EMAIL_ADRES FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${USER_ID}' AND APPLCNT_EMAIL_ADRES='${USER_EMAIL}' AND ENTRPRS_MBER_STTUS='P'`,
    );

    if (found) {
      try {
        const number: number =
          Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        await this.mailerService.sendMail({
          to: found.APPLCNT_EMAIL_ADRES, // list of receivers
          from: process.env.EMAIL_ADRES, // sender address
          subject: '이메일 인증 요청 메일입니다.', // Subject line
          html: '6자리 인증 코드 : ' + `<b> ${number}</b>`, // HTML body content
        });
        const password = String(number);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await conn.query(
          `UPDATE COMTNENTRPRSMBER SET ENTRPRS_MBER_PASSWORD='${hashedPassword}' WHERE ENTRPRS_MBER_ID='${USER_ID}'`,
        );

        return Object.assign({
          statusCode: 201,
          message: '임시 비밀번호 생성 성공',
        });
      } catch (err) {}
    } else {
      return Object.assign({
        statusCode: 200,
        message: '가입된 회원정보가 없습니다.',
      });
    }
  }

  async getTerms() {
    const conn = getConnection();
    const [found] = await conn.query(`SELECT * FROM terms`);

    return Object.assign({
      statusCode: 200,
      message: '이용약관 조회 성공',
      terms: found.TERMS,
      agree: found.AGREE,
    });
  }

  async emailAuth(param: { email: string }) {
    try {
      const number: number =
        Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
      await this.mailerService.sendMail({
        to: param.email, // list of receivers
        from: process.env.EMAIL_ADRES, // sender address
        subject: '이메일 인증 요청 메일입니다.', // Subject line
        html: '6자리 인증 코드 : ' + `<b> ${number}</b>`, // HTML body content
      });
      return Object.assign({
        statusCode: 201,
        message: '이메일 인증 번호 생성 성공',
        code: number,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async personalSignUp(
    authCredentialsPersonalDto: AuthCredentialsPersonalDto,
  ): Promise<void> {
    return await this.userPersonalRepository.createPersonalUser(
      authCredentialsPersonalDto,
    );
  }

  async enterpriseSignUp(
    authCredentialsEnterpriseDto: AuthCredentialsEnterpriseDto,
  ): Promise<void> {
    return await this.userEnterpriseRepository.createEnterpriseUser(
      authCredentialsEnterpriseDto,
    );
  }

  async signIn(loginInputDto: LoginInputDto): Promise<{
    statusCode: number;
    message: string;
    accessToken: string;
  }> {
    const { USER_ID, PASSWORD } = loginInputDto;

    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT USER_ID, PASSWORD FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_STTUS='P'`,
    );

    if (user && user.PASSWORD == PASSWORD) {
      //유저 토큰 생성(Secret + Payload)
      const payload = { USER_ID };
      const accessToken = await this.jwtService.sign(payload);
      return Object.assign({
        statusCode: 201,
        message: '로그인 성공',
        accessToken: accessToken,
      });
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }

  async deletePersonalUser(@Req() req) {
    const conn = getConnection();
    await conn.query(
      `UPDATE COMTNGNRLMBER SET MBER_STTUS='D', SECSN_DE=NOW() WHERE MBER_ID='${req.USER_ID}'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '회원 탈퇴 성공',
    });
  }

  async deleteEnterpriseUser(@Req() req) {
    const conn = getConnection();
    await conn.query(
      `UPDATE COMTNENTRPRSMBER SET ENTRPRS_MBER_STTUS='D', SECSN_DE=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '회원 탈퇴 성공',
    });
  }

  async personalUploadProfile(
    @Req() req,
    profilePersonalInputDto: ProfilePersonalInputDto,
  ) {
    const { MBER_NM, MBER_EMAIL_ADRES, MBTLNUM, ADRES, DETAIL_ADRES } =
      profilePersonalInputDto;

    const conn = getConnection();

    await conn.query(
      `UPDATE COMTNGNRLMBER SET MBER_NM='${MBER_NM}', MBER_EMAIL_ADRES='${MBER_EMAIL_ADRES}', MBTLNUM='${MBTLNUM}', ADRES='${ADRES}', DETAIL_ADRES='${DETAIL_ADRES}' WHERE MBER_ID='${req.USER_ID}'`,
    );
    return Object.assign({
      statusCode: 200,
      message: '개인회원 프로필 등록 성공',
    });
  }

  async personalPasswordChange(
    @Req() req,
    passwordChangeInputDto: PasswordChangeInputDto,
  ) {
    const { PASSWORD } = passwordChangeInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT MBER_ID FROM COMTNGNRLMBER WHERE MBER_ID='${req.USER_ID}'`,
    );

    if (found) {
      await conn.query(
        `UPDATE COMTNGNRLMBER SET PASSWORD='${PASSWORD}' WHERE MBER_ID='${req.USER_ID}'`,
      );
      return Object.assign({
        statusCode: 200,
        message: '비밀 번호 변경 성공',
      });
    } else {
      {
        throw new UnauthorizedException();
      }
    }
  }

  async enterprisePasswordChange(
    @Req() req,
    passwordChangeInputDto: PasswordChangeInputDto,
  ) {
    const { PASSWORD } = passwordChangeInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT ENTRPRS_MBER_ID FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    if (found) {
      await conn.query(
        `UPDATE COMTNENTRPRSMBER SET ENTRPRS_MBER_PASSWORD='${PASSWORD}' WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
      );
      return Object.assign({
        statusCode: 200,
        message: '비밀 번호 변경 성공',
      });
    } else {
      {
        throw new UnauthorizedException();
      }
    }
  }

  // async personalUser(
  //   createPersonalUserDto: CreatePersonalUserDto,
  //   user: User,
  // ): Promise<UserPersonal> {
  //   // console.log('createPersonalUserDto', createPersonalUserDto);
  //   // console.log('user', user.id);
  //   return await this.userPersonalDetailRepository.createPersonalUserDetail(
  //     createPersonalUserDto,
  //     user,
  //   );
  // }

  // async enterpriseUser(
  //   createPersonalUserDto: CreateEnterpriseUserDto,
  //   user: User,
  // ): Promise<UserEnterprise> {
  //   // console.log('createPersonalUserDto', createPersonalUserDto);
  //   // console.log('user', user.id);
  //   return await this.userEnterpriseDetailRepository.createEnterpriseUserDetail(
  //     createPersonalUserDto,
  //     user,
  //   );
  // }
}
