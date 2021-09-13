import {
  Body,
  Controller,
  Delete,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { Request } from 'express';
import {
  ResponseGetUserByIdDto,
  ResponseGetUserByIdFindInputDto,
  ResponseGetUserByIdFindOutputDto,
  ResponseGetUserByIdNotDto,
} from './dto/response/responseGetUserById.dto';
import { CreatePersonalUserDto } from './dto/create-personal-user.dto';
import { UserPersonal } from './entities/user-personal.entity';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { UserEnterprise } from './entities/user-enterprise.entity';
import { responseGetUserByEmailDto, responseGetUserByEmailNotDto } from './dto/response/responseGetUserByEmail.dto';
import { ResponseGetUserByPasswordFindInputDto, ResponseGetUserByPasswordFindOutputDto } from './dto/response/responseGetUserByPassword.dto';
import { ResponseGetUserByDeleteOutputDto } from './dto/response/responseGetUserByDelete.dto';

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
    description: '중복된 아이디가 없는경우',
    type: ResponseGetUserByIdNotDto,
  })
  @ApiResponse({
    status: 201,
    description: '중복된 아이디가 있는경우',
    type: ResponseGetUserByIdDto,
  })
  @Get('userId/:userId')
  async getUserById(
    @Param() param: { userId: string },
  ): Promise<ResponseGetUserByIdNotDto> {
    return await this.authService.getUserById(param);
  }

  //유저 이메일 중복체크 API
  @ApiOperation({ summary: '유저 이메일 중복체크 API' })
  @ApiParam({
    name: 'userEmail',
    example: 'hee1234@gmail.com',
    description: '중복체크할 유저 이메일',
  })
  @ApiOkResponse({
    description: '중복된 이메일이 없는경우',
    type: responseGetUserByEmailNotDto,
  })
  @ApiResponse({
    status: 201,
    description: '중복된 이메일이 있는경우',
    type: responseGetUserByEmailDto,
  })
  @Get('userEmail/:userEmail')
  async getUserByEmail(
    @Param('userEmail') useremail: string,
  ): Promise<responseGetUserByEmailNotDto> {
    return await this.authService.getUserByEmail(useremail);
  }

  //유저 아이디 찾기
  @ApiOperation({ summary: '유저 아이디 찾기 API' })
  @ApiBody({
    type:ResponseGetUserByIdFindInputDto
  })
  @ApiOkResponse({
    description: '유저 아이디 찾기 성공',
    type: ResponseGetUserByIdFindOutputDto,
  })
  @Get('userIdFind')
  async getUserByIdFind(){}

  //유저 패스워드 찾기
  @ApiOperation({ summary: '유저 패스워드 찾기 API' })
  @ApiBody({
    type:ResponseGetUserByPasswordFindInputDto
  })
  @ApiOkResponse({
    description: '유저 패스워드 찾기 성공',
    type: ResponseGetUserByPasswordFindOutputDto,
  })
  @Get('userPasswordFind')
  async getUserByPasswordFind(){}

  //회원 탈퇴하기
  @ApiOperation({ summary: '회원 탈퇴 API' })
  @ApiParam({
    name: 'userId',
    example: 'hee1234',
    description: '유저Id',
  })
  @ApiOkResponse({
    description: '회원 탈퇴 성공 성공',
    type: ResponseGetUserByDeleteOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자 입니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':userId')
  async deleteUser(){}

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
  @ApiOperation({ summary: '개인 프로필 정보 보내기 API' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @Post('/personal/profile')
  async personalUser(
    @Body() createPersonalUserDto: CreatePersonalUserDto,
    @GetUser() user: User,
  ): Promise<UserPersonal> {
    return await this.authService.personalUser(createPersonalUserDto, user);
  }

  //기업 프로필 정보 보내기 API
  @ApiOperation({ summary: '기업 프로필 정보 보내기 API' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @Post('/enterprise/profile')
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
