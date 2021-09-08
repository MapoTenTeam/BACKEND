import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ResponseGetUserByDto } from './dto/response/responseGetUserById.dto';
import { User } from './entities/user.entity';
import { CreatePersonalUserDto } from './dto/create-personal-user.dto';
import { UserPersonal } from './entities/user-personal.entity';
import { UserPersonalDetailRepository } from './repository/user-personal-detail.repository';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { UserEnterprise } from './entities/user-enterprise.entity';
import { UserEnterpriseDetailRepository } from './repository/user-enterprise-detail.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userPersonalDetailRepository: UserPersonalDetailRepository,
    private userEnterpriseDetailRepository: UserEnterpriseDetailRepository,
    private jwtService: JwtService,
  ) {}

  async getUserById(userId: string): Promise<ResponseGetUserByDto> {
    const found = await this.userRepository.findOne({ userId });

    return found
      ? Object.assign({
          statusCode: 200,
          message: 'userID existence',
          data: { isDuplicate: true },
        })
      : Object.assign({
          statusCode: 200,
          message: 'userID null',
          data: { isDuplicate: false },
        });
  }

  async getUserByEmail(useremail: string): Promise<ResponseGetUserByDto> {
    const found = await this.userRepository.findOne({ useremail });

    return found
      ? Object.assign({
          statusCode: 200,
          message: 'userEmail existence',
          data: { isDuplicate: true },
        })
      : Object.assign({
          statusCode: 200,
          message: 'userEmail null',
          data: { isDuplicate: false },
        });
  }

  async personalSignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.createPersonalUser(authCredentialsDto);
  }

  async enterpriseSignUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.userRepository.createEnterpriseUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
    statusCode: number;
    message: string;
    accessToken: string;
  }> {
    const { userId, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ userId });

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성(Secret + Payload)
      const payload = { userId };
      const accessToken = await this.jwtService.sign(payload);

      return Object.assign({
        statusCode: 200,
        message: 'login success',
        data: { accessToken: accessToken },
      });
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async personalUser(
    createPersonalUserDto: CreatePersonalUserDto,
    user: User,
  ): Promise<UserPersonal> {
    // console.log('createPersonalUserDto', createPersonalUserDto);
    // console.log('user', user.id);
    return await this.userPersonalDetailRepository.createPersonalUserDetail(
      createPersonalUserDto,
      user,
    );
  }

  async enterpriseUser(
    createPersonalUserDto: CreateEnterpriseUserDto,
    user: User,
  ): Promise<UserEnterprise> {
    // console.log('createPersonalUserDto', createPersonalUserDto);
    // console.log('user', user.id);
    return await this.userEnterpriseDetailRepository.createEnterpriseUserDetail(
      createPersonalUserDto,
      user,
    );
  }
}
