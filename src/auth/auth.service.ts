import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserPersonal } from './entities/user-personal.entity';
import { UserEnterprise } from './entities/user-enterprise.entity';
import { GetUserByIdDto } from './dtos/response/getUserById.dto';
import { GetUserByEmailDto } from './dtos/response/getUserByEmail.dto';
import { AuthCredentialsPersonalDto } from './dtos/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    // private userPersonalDetailRepository: UserPersonalDetailRepository,
    // private userEnterpriseDetailRepository: UserEnterpriseDetailRepository,
    private jwtService: JwtService,
  ) {}

  async getUserById(param: { userid: string }): Promise<GetUserByIdDto> {
    const found = await this.userRepository.findOne({
      where: {
        userId: param.userid,
      },
    });

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

  async getUserByEmail(useremail: string): Promise<GetUserByEmailDto> {
    const found = await this.userRepository.findOne({ useremail });

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

  // async personalSignUp(
  //   authCredentialsDto: AuthCredentialsPersonalDto,
  // ): Promise<void> {
  //   return await this.userRepository.createPersonalUser(authCredentialsDto);
  // }

  // async enterpriseSignUp(
  //   authCredentialsDto: AuthCredentialsPersonalDto,
  // ): Promise<void> {
  //   return await this.userRepository.createEnterpriseUser(authCredentialsDto);
  // }

  // async signIn(authCredentialsDto: AuthCredentialsPersonalDto): Promise<{
  //   statusCode: number;
  //   message: string;
  //   accessToken: string;
  // }> {
  //   const { userId, password } = authCredentialsDto;
  //   const user = await this.userRepository.findOne({ userId });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     //유저 토큰 생성(Secret + Payload)
  //     const payload = { userId };
  //     const accessToken = await this.jwtService.sign(payload);

  //     return Object.assign({
  //       statusCode: 200,
  //       message: 'login success',
  //       data: { accessToken: accessToken },
  //     });
  //   } else {
  //     throw new UnauthorizedException('login failed');
  //   }
  // }

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
