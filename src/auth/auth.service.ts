import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { GetUserByIdDto } from './dtos/response/getUserById.dto';
import { GetUserByEmailDto } from './dtos/response/getUserByEmail.dto';
import {
  AuthCredentialsEnterpriseDto,
  AuthCredentialsPersonalDto,
  LoginInputDto,
} from './dtos/auth-credential.dto';
import { UserPersonalRepository } from './repository/user-personal-repository';
import { UserEnterpriseRepository } from './repository/user-enterprise-repository';
import { getConnection } from 'typeorm';

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

  // async getUserById(param: { userid: string }): Promise<GetUserByIdDto> {
  //   const found = await this.userRepository.findOne({
  //     where: {
  //       userId: param.userid,
  //     },
  //   });

  //   return found
  //     ? Object.assign({
  //         statusCode: 200,
  //         message: '유저 아이디가 존재합니다.',
  //         isDuplicate: true,
  //       })
  //     : Object.assign({
  //         statusCode: 200,
  //         message: '유저 아이디가 없습니다.',
  //         isDuplicate: false,
  //       });
  // }

  // async getUserByEmail(useremail: string): Promise<GetUserByEmailDto> {
  //   const found = await this.userRepository.findOne({ useremail });

  //   return found
  //     ? Object.assign({
  //         statusCode: 200,
  //         message: '유저 이메일이 존재합니다',
  //         isDuplicate: true,
  //       })
  //     : Object.assign({
  //         statusCode: 200,
  //         message: '유저 이메일이 없습니다.',
  //         isDuplicate: false,
  //       });
  // }

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
