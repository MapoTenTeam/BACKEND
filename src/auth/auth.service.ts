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
  TermsOutputDto,
  UserByEmailInputDto,
} from './dtos/auth-credential.dto';
import { UserPersonalRepository } from './repository/user-personal-repository';
import { UserEnterpriseRepository } from './repository/user-enterprise-repository';
import { getConnection } from 'typeorm';
import { GetUserByBizrnoDto } from './dtos/response/getUserByBizrno.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserPersonalRepository)
    private userPersonalRepository: UserPersonalRepository,
    // private userPersonalDetailRepository: UserPersonalDetailRepository,
    // private userEnterpriseDetailRepository: UserEnterpriseDetailRepository,
    private jwtService: JwtService,
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
      `SELECT EMAIL_ADRES FROM COMVNUSERMASTER WHERE EMAIL_ADRES='${email}' AND USER_STTUS=true`,
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
      `SELECT BIZRNO FROM COMTNENTRPRSMBER WHERE BIZRNO='${param.bizrno}' AND USER_STTUS=true`,
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
      `SELECT USER_ID FROM COMVNUSERMASTER WHERE USER_NM='${USER_NM}' AND EMAIL_ADRES='${USER_EMAIL}' AND USER_STTUS=true`,
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
      `SELECT USER_ID, PASSWORD FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_STTUS=true`,
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
      `UPDATE COMTNGNRLMBER SET MBER_STTUS=false, SECSN_DE=NOW() WHERE MBER_ID='${req.USER_ID}'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '회원 탈퇴 성공',
    });
  }

  async deleteEnterpriseUser(@Req() req) {
    const conn = getConnection();
    await conn.query(
      `UPDATE COMTNENTRPRSMBER SET ENTRPRS_MBER_STTUS=false, SECSN_DE=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '회원 탈퇴 성공',
    });
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
