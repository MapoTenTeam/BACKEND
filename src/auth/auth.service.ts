import { Injectable, Logger, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  GetUserByIdDto,
  GetUserByIdFindInputDto,
  GetUserByIdFindOutputDto,
} from './dtos/response/getUserById.dto';
import {
  AuthCredentialsEnterpriseDto,
  AuthCredentialsPersonalDto,
  LoginInputDto,
  PasswordChangeInputDto,
  PasswordConfirmInputDto,
  PasswordInputDto,
} from './dtos/auth-credential.dto';
import { UserPersonalRepository } from './repository/user-personal-repository';
import { UserEnterpriseRepository } from './repository/user-enterprise-repository';
import { getConnection } from 'typeorm';
import { GetUserByBizrnoDto } from './dtos/response/getUserByBizrno.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { GetUserByPasswordFindInputDto } from './dtos/response/getUserByPassword.dto';
import { ProfilePersonalInputDto } from './dtos/personalUser.dto';
import { ProfileEnterpriseInputDto } from './dtos/enterpriseUser.dto';
import { createImageURL } from './multerOptions';
import * as pbkdf2 from 'pbkdf2-sha256';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserPersonalRepository)
    private userPersonalRepository: UserPersonalRepository,
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

  async getUserByEmail(param: { email: string }) {
    // const { email } = userByEmailInputDto;
    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT USER_EMAIL FROM COMVNUSERMASTER WHERE USER_EMAIL='${param.email}' AND USER_STTUS='P'`,
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
      `SELECT BIZRNO FROM COMTNENTRPRSMBER WHERE BIZRNO='${param.bizrno}' AND ENTRPRS_MBER_STTUS='P'`,
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
      `SELECT USER_ID FROM COMVNUSERMASTER WHERE USER_NM='${USER_NM}' AND USER_EMAIL='${USER_EMAIL}' AND USER_STTUS='P'`,
    );

    return found
      ? Object.assign({
          statusCode: 200,
          message: '유저 아이디 조회 성공',
          userId: found.USER_ID,
        })
      : Object.assign({
          statusCode: 400,
          message: '가입된 회원정보가 없습니다.',
        });
  }

  async getByPasswordFind(
    getUserByPasswordFindInputDto: GetUserByPasswordFindInputDto,
  ) {
    const { USER_ID, USER_EMAIL } = getUserByPasswordFindInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT USER_EMAIL, USER_SE FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_EMAIL='${USER_EMAIL}' AND USER_STTUS='P'`,
    );

    if (found) {
      try {
        const number: number =
          Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        await this.mailerService.sendMail({
          to: found.USER_EMAIL, // list of receivers
          from: process.env.EMAIL_ADRES, // sender address
          subject: '이메일 인증 요청 메일입니다.', // Subject line
          html: '6자리 인증 코드 : ' + `<b> ${number}</b>`, // HTML body content
        });
        const password = String(number);
        const cryptoSalt = process.env.CRYPTOSALT;
        const cryptoPassword = await pbkdf2(
          password,
          cryptoSalt,
          parseInt(process.env.REPEAT_NUMBER),
          parseInt(process.env.LENGTH),
        );
        const hashed = await cryptoPassword.toString(process.env.HASHED);
        const bcryptSalt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(hashed, bcryptSalt);

        if (found.USER_SE == 'GNR') {
          await conn.query(
            `UPDATE COMTNGNRLMBER SET PASSWORD='${hashedPassword}' WHERE MBER_ID='${USER_ID}'`,
          );
          this.logger.log(`개인 회원: ${USER_ID} 임시비밀번호 생성 성공`);
        } else if (found.USER_SE == 'ENT') {
          await conn.query(
            `UPDATE COMTNENTRPRSMBER SET ENTRPRS_MBER_PASSWORD='${hashedPassword}' WHERE ENTRPRS_MBER_ID='${USER_ID}'`,
          );
          this.logger.log(`기업 회원: ${USER_ID} 임시비밀번호 생성 성공`);
        } else {
          this.logger.error(`회원: ${USER_ID} 임시비밀번호 생성 실패`);
          return Object.assign({
            statusCode: 404,
            message: '임시 비밀번호 생성 실패',
          });
        }

        return Object.assign({
          statusCode: 201,
          message: '임시 비밀번호 생성 성공',
        });
      } catch (err) {
        this.logger.error(`회원: ${USER_ID} 임시비밀번호 생성 실패
        Error: ${err}`);
        return Object.assign({
          statusCode: 404,
          message: '임시 비밀번호 생성 실패',
        });
      }
    } else {
      return Object.assign({
        statusCode: 400,
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
      this.logger.log(`이메일 인증 번호 생성 성공`);
      return Object.assign({
        statusCode: 201,
        message: '이메일 인증 번호 생성 성공',
        code: number,
      });
    } catch (err) {
      this.logger.error(`이메일 인증 번호 생성 실패
      Error: ${err}`);
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
      `SELECT USER_ID, PASSWORD, USER_SE FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_STTUS='P'`,
    );

    if (user && (await bcrypt.compare(PASSWORD, user.PASSWORD))) {
      // if (user && user.PASSWORD == PASSWORD) {
      //유저 토큰 생성(Secret + Payload)
      const payload = { USER_ID };
      const accessToken = await this.jwtService.sign(payload);
      this.logger.log(`로그인 성공
      User Id: ${USER_ID}`);
      return Object.assign({
        statusCode: 201,
        message: '로그인 성공',
        accessToken: accessToken,
        user_se: user.USER_SE,
      });
    } else {
      this.logger.warn(`로그인 실패
      User Id: ${USER_ID}`);
      throw new UnauthorizedException('로그인 실패');
    }
  }

  async siginInApp(loginInputDto: LoginInputDto): Promise<{
    statusCode: number;
    message: string;
    accessToken: string;
  }> {
    const { USER_ID, PASSWORD } = loginInputDto;

    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT USER_ID, PASSWORD, USER_SE FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_STTUS='P'`,
    );

    if (user && user.PASSWORD == PASSWORD) {
      //유저 토큰 생성(Secret + Payload)
      const payload = { USER_ID };
      const accessToken = await this.jwtService.sign(payload);
      return Object.assign({
        statusCode: 201,
        message: '로그인 성공',
        accessToken: accessToken,
        user_se: user.USER_SE,
      });
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }

  async siginInSwagger(loginInputDto: LoginInputDto): Promise<{
    statusCode: number;
    message: string;
    accessToken: string;
  }> {
    const { USER_ID, PASSWORD } = loginInputDto;

    const cryptoSalt = process.env.CRYPTOSALT;
    const cryptoPassword = await pbkdf2(
      PASSWORD,
      cryptoSalt,
      parseInt(process.env.REPEAT_NUMBER),
      parseInt(process.env.LENGTH),
    );
    const hashed = await cryptoPassword.toString(process.env.HASHED);

    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT USER_ID, PASSWORD, USER_SE FROM COMVNUSERMASTER WHERE USER_ID='${USER_ID}' AND USER_STTUS='P'`,
    );

    if (user && (await bcrypt.compare(hashed, user.PASSWORD))) {
      //유저 토큰 생성(Secret + Payload)
      const payload = { USER_ID };
      const accessToken = await this.jwtService.sign(payload);
      return Object.assign({
        statusCode: 201,
        message: '로그인 성공',
        accessToken: accessToken,
        user_se: user.USER_SE,
      });
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }

  async passwordFirst(passwordInputDto: PasswordInputDto) {
    const { PASSWORD } = passwordInputDto;

    const cryptoSalt = process.env.CRYPTOSALT;
    const cryptoPassword = await pbkdf2(
      PASSWORD,
      cryptoSalt,
      parseInt(process.env.REPEAT_NUMBER),
      parseInt(process.env.LENGTH),
    );
    const hashed = await cryptoPassword.toString(process.env.HASHED);

    return {
      password: hashed,
    };
  }

  async passwordSecond(passwordInputDto: PasswordInputDto) {
    const { PASSWORD } = passwordInputDto;

    const bcryptSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(PASSWORD, bcryptSalt);

    return {
      password: hashedPassword,
    };
  }

  async passwordIntegrat(passwordInputDto: PasswordInputDto) {
    const { PASSWORD } = passwordInputDto;

    const cryptoSalt = process.env.CRYPTOSALT;
    const cryptoPassword = await pbkdf2(
      PASSWORD,
      cryptoSalt,
      parseInt(process.env.REPEAT_NUMBER),
      parseInt(process.env.LENGTH),
    );
    const hashed = await cryptoPassword.toString(process.env.HASHED);
    const bcryptSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(hashed, bcryptSalt);

    return {
      password: hashedPassword,
    };
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
    await conn.query(
      `UPDATE jobInformation SET JOB_STTUS='N', DELEETE_AT=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '회원 탈퇴 성공',
    });
  }

  async getPersonalProfile(@Req() req) {
    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT MBER_NM, MBER_ID, MBER_EMAIL_ADRES, 
      IFNULL(MBTLNUM, '') AS MBTLNUM, 
      IFNULL(ADRES, '') AS ADRES, 
      IFNULL(DETAIL_ADRES, '') AS DETAIL_ADRES, PROFILE_STTUS  
      FROM COMTNGNRLMBER WHERE MBER_ID='${req.USER_ID}'`,
    );

    if (user) {
      this.logger.log(`개인 회원 프로필 조회 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 200,
        message: '개인 회원 프로필 조회 성공',
        data: user,
      });
    } else {
      this.logger.warn(`개인 회원 프로필 조회 실패
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 400,
        message: '개인 회원 프로필 조회 실패',
      });
    }
  }

  async getEnterpriseProfile(@Req() req) {
    const conn = getConnection();
    const [find] = await conn.query(
      `SELECT ENTRPRS_SE_CODE, BSNNM_APRVL_CODE FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    const [user] = await conn.query(
      `SELECT APPLCNT_NM, ENTRPRS_MBER_ID, APPLCNT_EMAIL_ADRES,
      IFNULL((SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='COM026' AND CODE='${find.ENTRPRS_SE_CODE}' AND USE_AT ='Y'),'') AS ENTRPRS_SE,
      CMPNY_NM, BIZRNO, 
      IFNULL(CEO,'') AS CEO, 
      IFNULL(ADRES,'') AS ADRES, 
      IFNULL(DETAIL_ADRES,'') AS DETAIL_ADRES, 
      IFNULL(INDUTY,'') AS INDUTY, 
      IFNULL(NMBR_WRKRS, '') AS NMBR_WRKRS, 
      IFNULL(WEB_ADRES,'') AS WEB_ADRES,
      IFNULL(CEO_EMAIL_ADRES,'') AS CEO_EMAIL_ADRES, 
      IFNULL(CMPNY_IM,'') AS CMPNY_IM, PROFILE_STTUS, 
      BSNNM_APRVL_CODE,
      (SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='crnst' AND CODE='${find.BSNNM_APRVL_CODE}' AND USE_AT ='Y') AS BSNNM_APRVL_NAME
      FROM COMTNENTRPRSMBER
      WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    if (user) {
      this.logger.log(`기업 회원 프로필 조회 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 200,
        message: '기업 회원 프로필 조회 성공',
        data: user,
      });
    } else {
      this.logger.warn(`기업 회원 프로필 조회 실패
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 400,
        message: '기업 회원 프로필 조회 실패',
      });
    }
  }

  async getEnterpriseDivision() {
    const conn = getConnection();
    const user = await conn.query(
      `SELECT  CODE, CODE_NM FROM  COMTCCMMNDETAILCODE WHERE CODE_ID ='COM026' AND USE_AT ='Y'`,
    );
    return Object.assign({
      statusCode: 200,
      message: '기업회원 프로필 기업유형 조회 성공',
      ENTRPRS_SE_CODE: user,
    });
  }

  async enterpriseBusinessApproval(@Req() req) {
    const conn = getConnection();
    await conn.query(
      `UPDATE COMTNENTRPRSMBER SET BSNNM_APRVL_CODE='20', REQUEST_DATE=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '사업자 승인 요청 성공',
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
      `UPDATE COMTNGNRLMBER SET MBER_NM='${MBER_NM}', MBER_EMAIL_ADRES='${MBER_EMAIL_ADRES}', 
      MBTLNUM='${MBTLNUM}', ADRES='${ADRES}', DETAIL_ADRES='${DETAIL_ADRES}', PROFILE_STTUS=true 
      WHERE MBER_ID='${req.USER_ID}'`,
    );
    this.logger.log(`개인회원 ${req.USER_ID} 프로필 등록 or 수정 성공`);
    return Object.assign({
      statusCode: 200,
      message: '개인회원 프로필 등록 성공',
    });
  }

  async enterpriseProfile(
    @Req() req,
    profileEnterpriseInputDto: ProfileEnterpriseInputDto,
  ) {
    const {
      APPLCNT_NM,
      APPLCNT_EMAIL_ADRES,
      ENTRPRS_SE_CODE,
      CMPNY_NM,
      BIZRNO,
      CEO,
      ADRES,
      DETAIL_ADRES,
      INDUTY,
      NMBR_WRKRS,
      WEB_ADRES,
      CEO_EMAIL_ADRES,
    } = profileEnterpriseInputDto;

    const conn = getConnection();
    await conn.query(
      `UPDATE COMTNENTRPRSMBER SET APPLCNT_NM='${APPLCNT_NM}', APPLCNT_EMAIL_ADRES='${APPLCNT_EMAIL_ADRES}', 
      ENTRPRS_SE_CODE='${ENTRPRS_SE_CODE}', CMPNY_NM='${CMPNY_NM}',BIZRNO='${BIZRNO}',CEO='${CEO}',ADRES='${ADRES}',
      DETAIL_ADRES='${DETAIL_ADRES}',INDUTY='${INDUTY}',NMBR_WRKRS='${NMBR_WRKRS}',WEB_ADRES='${WEB_ADRES}',
      CEO_EMAIL_ADRES='${CEO_EMAIL_ADRES}', PROFILE_STTUS=true WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );
    this.logger.log(`기업회원 ${req.USER_ID} 프로필 등록 or 수정 성공`);
    return Object.assign({
      statusCode: 200,
      message: '기업회원 프로필 등록 성공',
    });
  }

  async enterpriseProfileImage(req, files: string) {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
      // http://주소:포트번호/upload/파일이름 형식으로 저장이 됩니다.
    }

    const conn = getConnection();

    if (generatedFiles[0]) {
      const [user] = await conn.query(
        `SELECT ENTRPRS_MBER_ID FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND ENTRPRS_MBER_STTUS='P'`,
      );

      if (user) {
        await conn.query(
          `UPDATE COMTNENTRPRSMBER SET CMPNY_IM='${generatedFiles[0]}' WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
        );
        this.logger.log(`이미지 등록 성공
        User Id: ${req.USER_ID}`);
        return Object.assign({
          statusCode: 201,
          message: '이미지 등록 성공',
        });
      } else {
        this.logger.warn(`이미지 등록 실패
        User Id: ${req.USER_ID}`);
        return Object.assign({
          statusCode: 404,
          message: '이미지 등록 실패',
        });
      }
    } else {
      this.logger.warn(`이미지 등록 실패
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 404,
        message: '이미지 등록 실패',
      });
    }
  }

  async getPasswordConfirm(
    @Req() req,
    passwordConfirmInputDto: PasswordConfirmInputDto,
  ) {
    const { PASSWORD } = passwordConfirmInputDto;

    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT USER_ID, PASSWORD FROM COMVNUSERMASTER WHERE USER_ID='${req.USER_ID}'`,
    );

    if (found && (await bcrypt.compare(PASSWORD, found.PASSWORD))) {
      this.logger.log(`유저 비밀번호 조회 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 201,
        message: '유저 비밀번호 조회 성공',
      });
    } else {
      this.logger.warn(`유저 비밀번호 조회 실패
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 400,
        message: '유저 비밀번호 조회 실패',
      });
    }
  }

  async personalPasswordChange(
    @Req() req,
    passwordChangeInputDto: PasswordChangeInputDto,
  ) {
    const { PASSWORD } = passwordChangeInputDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT MBER_ID FROM COMTNGNRLMBER WHERE MBER_ID='${req.USER_ID}'`,
    );

    if (found) {
      await conn.query(
        `UPDATE COMTNGNRLMBER SET PASSWORD='${hashedPassword}' WHERE MBER_ID='${req.USER_ID}'`,
      );
      this.logger.log(`비밀 번호 변경 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 200,
        message: '개인 비밀 번호 변경 성공',
      });
    } else {
      this.logger.warn(`개인 비밀 번호 변경 실패
      User Id: ${req.USER_ID}`);
      throw new UnauthorizedException();
    }
  }

  async enterprisePasswordChange(
    @Req() req,
    passwordChangeInputDto: PasswordChangeInputDto,
  ) {
    const { PASSWORD } = passwordChangeInputDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT ENTRPRS_MBER_ID FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
    );

    if (found) {
      await conn.query(
        `UPDATE COMTNENTRPRSMBER SET ENTRPRS_MBER_PASSWORD='${hashedPassword}' WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
      );
      this.logger.log(`기업 비밀 번호 변경 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 200,
        message: '비밀 번호 변경 성공',
      });
    } else {
      this.logger.warn(`기업 비밀 번호 변경 실패
      User Id: ${req.USER_ID}`);
      throw new UnauthorizedException();
    }
  }
}
