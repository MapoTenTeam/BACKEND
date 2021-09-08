import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { Request } from 'express';
import { ResponseGetUserByDto } from './dto/response/responseGetUserById.dto';
import { CreatePersonalUserDto } from './dto/create-personal-user.dto';
import { UserPersonal } from './entities/user-personal.entity';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { UserEnterprise } from './entities/user-enterprise.entity';

@ApiTags('유저 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //유저ID 중복체크 API
  @Get('userId/:userId')
  @ApiOperation({ summary: '유저 아이디 중복체크 API' })
  getUserById(@Param('userId') userId: string): Promise<ResponseGetUserByDto> {
    return this.authService.getUserById(userId);
  }

  //유저 이메일 중복체크 API
  @Get('userEmail/:userEmail')
  @ApiOperation({ summary: '유저 이메일 중복체크 API' })
  getUserByEmail(
    @Param('userEmail') useremail: string,
  ): Promise<ResponseGetUserByDto> {
    return this.authService.getUserByEmail(useremail);
  }

  //개인 회원가입 API
  @Post('/personal/signup')
  @ApiOperation({ summary: '개인 회원 가입 API' })
  @ApiBody({ type: AuthCredentialsDto })
  async personalSignUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.personalSignUp(authCredentialsDto);
  }

  // 기업 회원가입 API
  @Post('/enterprise/signup')
  @ApiOperation({ summary: '기업 회원 가입 API' })
  @ApiBody({ type: AuthCredentialsDto })
  async enterpriseSignUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.enterpriseSignUp(authCredentialsDto);
  }

  // 로그인 API
  @Post('/signin')
  @ApiOperation({ summary: '로그인 API' })
  async siginIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  //개인 프로필 정보 보내기 API
  @Post('/personal/profile')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async personalUser(
    @Body() createPersonalUserDto: CreatePersonalUserDto,
    @GetUser() user: User,
  ): Promise<UserPersonal> {
    return await this.authService.personalUser(createPersonalUserDto, user);
  }

  //기업 프로필 정보 보내기 API
  @Post('/enterprise/profile')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async enterpriseUser(
    @Body() createEnterpriseUserDto: CreateEnterpriseUserDto,
    @GetUser() user: User,
  ): Promise<UserEnterprise> {
    return await this.authService.enterpriseUser(createEnterpriseUserDto, user);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user: User) {
    console.log('req', user);
    return await user;
  }
}
