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
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  getSchemaPath,
  refs,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { Request } from 'express';
import {
  ResponseGetUserByIdDto,
  ResponseGetUserByIdNotDto,
} from './dto/response/responseGetUserById.dto';
import { CreatePersonalUserDto } from './dto/create-personal-user.dto';
import { UserPersonal } from './entities/user-personal.entity';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { UserEnterprise } from './entities/user-enterprise.entity';
import { responseGetUserByEmailDto } from './dto/response/responseGetUserByEmail.dto';

@ApiTags('유저 API')
@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  //유저ID 중복체크 API

  @ApiOperation({ summary: '유저 아이디 중복체크 API' })
  @ApiParam({
    name: 'userId',
    example: 'hee1234',
    description: '중복체크할 유저 아이디',
  })
  @ApiOkResponse({
    description: '유저 아이디가 없는경우',
    type: ResponseGetUserByIdDto,
  })
  @ApiResponse({
    status: 201,
    description: '유저 아이디가 있는경우',
    type: ResponseGetUserByIdNotDto,
  })
  @Get('userId/:userId')
  getUserById(
    @Param() param: { userId: string },
  ): Promise<ResponseGetUserByIdDto> {
    return this.authService.getUserById(param);
  }

  //유저 이메일 중복체크 API
  @Get('userEmail/:userEmail')
  @ApiOperation({ summary: '유저 이메일 중복체크 API' })
  getUserByEmail(
    @Param('userEmail') useremail: string,
  ): Promise<responseGetUserByEmailDto> {
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
  @ApiOperation({ summary: '개인 프로필 정보 보내기 API' })
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
  @ApiOperation({ summary: '기업 프로필 정보 보내기 API' })
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
