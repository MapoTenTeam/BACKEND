import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

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
  ApiBasicAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './get-user.decorator';
import { Request } from 'express';
import {
  GetUserByIdDto,
  GetUserByIdFindInputDto,
  GetUserByIdFindOutputDto,
  GetUserByIdNotDto,
} from './dtos/response/getUserById.dto';
import { UserPersonal } from './entities/user-personal.entity';
import { UserEnterprise } from './entities/user-enterprise.entity';
import {
  GetUserByEmailAuthDto,
  GetUserByEmailDto,
  GetUserByEmailNotDto,
} from './dtos/response/getUserByEmail.dto';
import {
  GetUserByPasswordFindInputDto,
  GetUserByPasswordFindOutputDto,
} from './dtos/response/getUserByPassword.dto';
import { GetUserByDeleteOutputDto } from './dtos/response/getUserByDelete.dto';
import {
  EditProfilePersonalInputDto,
  EditProfilePersonalOutputDto,
  PasswordPersonalOutputDto,
  ProfilePersonalInputDto,
  ProfilePersonalOutputDto,
  SelectProfilePersonalOutputDto,
  SignupPersonalOutputDto,
} from './dtos/personalUser.dto';
import {
  EditProfileEnterpriseInputDto,
  EditProfileEnterpriseOutputDto,
  PasswordEnterpriseOutputDto,
  ProfileEnterpriseInputDto,
  ProfileEnterpriseOutputDto,
  ProfileImageEnterpriseOutputDto,
  SelectProfileEnterpriseOutputDto,
  SignupEnterpriseOutputDto,
} from './dtos/enterpriseUser.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  AuthCredentialsEnterpriseDto,
  AuthCredentialsPersonalDto,
  LoginInputDto,
  LoginOutputDto,
  TermsOutputDto,
} from './dtos/auth-credential.dto';
import {
  GetUserByBizrnoDto,
  GetUserByBizrnoNotDto,
} from './dtos/response/getUserBybizrno.dto';

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
    description: '아이디가 없는경우',
    type: GetUserByIdNotDto,
  })
  @ApiResponse({
    status: 201,
    description: '아이디가 있는경우',
    type: GetUserByIdDto,
  })
  @Get('/duplicate/id/:id')
  async getUserById(
    @Param() param: { userid: string },
  ): Promise<GetUserByIdNotDto> {
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
    description: '이메일이 없는경우',
    type: GetUserByEmailNotDto,
  })
  @ApiResponse({
    status: 201,
    description: '이메일이 있는경우',
    type: GetUserByEmailDto,
  })
  @Get('/duplicate/email/:email')
  async getUserByEmail() {
    //   @Param('email') email: string,
    // ): Promise<GetUserByEmailNotDto> {
    //   return await this.authService.getUserByEmail(email);
  }

  //기업 사업자등록번호 중복체크 API
  @ApiOperation({ summary: '사업자등록번호 중복체크 API' })
  @ApiParam({
    name: 'bizrno',
    example: '1231212345',
    description: '중복체크할 사업자등록번호',
  })
  @ApiOkResponse({
    description: '사업자등록번호이 없는경우',
    type: GetUserByBizrnoNotDto,
  })
  @ApiResponse({
    status: 201,
    description: '사업자등록번호이 있는경우',
    type: GetUserByBizrnoDto,
  })
  @Get('/duplicate/bizrno/:bizrno')
  async getUserBybizrno() {
    //   @Param('email') email: string,
    // ): Promise<GetUserByEmailNotDto> {
    //   return await this.authService.getUserByEmail(email);
  }

  //유저 아이디 찾기
  @ApiOperation({ summary: '유저 아이디 찾기 API' })
  @ApiBody({
    description: '유저 정보',
    type: GetUserByIdFindInputDto,
  })
  @ApiOkResponse({
    description: '유저 아이디 찾기 성공',
    type: GetUserByIdFindOutputDto,
  })
  @Get('/find/id')
  async getUserByIdFind() {}

  //유저 패스워드 찾기
  @ApiOperation({ summary: '유저 패스워드 찾기 API' })
  @ApiBody({
    description: '유저 정보',
    type: GetUserByPasswordFindInputDto,
  })
  @ApiOkResponse({
    description: '임시 비밀번호 생성 성공',
    type: GetUserByPasswordFindOutputDto,
  })
  @Get('/find/password')
  async getUserByPasswordFind() {}

  //이용 약관
  @ApiOperation({ summary: '이용 약관 API' })
  @ApiOkResponse({
    description: '이용약관 가져오기',
    type: TermsOutputDto,
  })
  @Get('/terms')
  async getTerms() {}

  //개인 회원 탈퇴하기
  @ApiOperation({ summary: '개인 회원 탈퇴 API' })
  @ApiParam({
    name: 'userId',
    example: 'hee1234',
    description: '유저Id',
  })
  @ApiOkResponse({
    description: '회원 탈퇴 성공 성공',
    type: GetUserByDeleteOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자 입니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('/personal/:userId')
  async deletePersonalUser() {}

  //기업 회원 탈퇴하기
  @ApiOperation({ summary: '기업 회원 탈퇴 API' })
  @ApiParam({
    name: 'userId',
    example: 'hee1234',
    description: '유저Id',
  })
  @ApiOkResponse({
    description: '회원 탈퇴 성공 성공',
    type: GetUserByDeleteOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자 입니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('/enterprise/:userId')
  async deleteEnterpriseUser() {}

  //이메일 인증
  @Post('/auth/email/:email')
  @ApiOperation({ summary: '이메일 인증 API' })
  @ApiParam({
    name: 'email',
    example: 'hee1234@gmail.com',
    description: '인증 받을 이메일',
  })
  @ApiOkResponse({
    description: '인증번호',
    type: GetUserByEmailAuthDto,
  })
  async emailAuth() {}

  //개인 회원가입 API
  // @Post('/personal/signup')
  // @ApiOperation({ summary: '개인 회원 가입 API' })
  // @ApiBody({ type: AuthCredentialsDto })
  // async personalSignUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return await this.authService.personalSignUp(authCredentialsDto);
  // }

  //개인 회원가입 API
  @Post('/personal/signup')
  @ApiOperation({ summary: '개인 회원 가입 API' })
  @ApiBody({
    description: '유저 정보',
    type: AuthCredentialsPersonalDto,
  })
  @ApiOkResponse({
    description: '개인 회원가입 성공',
    type: SignupPersonalOutputDto,
  })
  async personalSignUp() {}

  // 기업 회원가입 API
  // @Post('/enterprise/signup')
  // @ApiOperation({ summary: '기업 회원 가입 API' })
  // @ApiBody({ type: AuthCredentialsDto })
  // async enterpriseSignUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return await this.authService.enterpriseSignUp(authCredentialsDto);
  // }

  // 기업 회원가입 API
  @Post('/enterprise/signup')
  @ApiOperation({ summary: '기업 회원 가입 API' })
  @ApiBody({ description: '유저 정보', type: AuthCredentialsEnterpriseDto })
  @ApiOkResponse({
    description: '기업 회원가입 성공',
    type: SignupEnterpriseOutputDto,
  })
  async enterpriseSignUp() {}

  // 로그인 API
  @Post('/signin')
  @ApiOperation({ summary: '로그인 API' })
  @ApiBody({ description: '유저 정보', type: LoginInputDto })
  @ApiOkResponse({
    description: '로그인 성공',
    type: LoginOutputDto,
  })
  async siginIn() {
    //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    // ): Promise<{ accessToken: string }> {
    //   return await this.authService.signIn(authCredentialsDto);
  }

  //개인 회원 프로필 조회
  @Get('/personal/profile')
  @ApiOperation({ summary: '개인 회원 프로필 조회 API' })
  @ApiOkResponse({
    description: '개인 회원 프로필 조회 성공',
    type: SelectProfilePersonalOutputDto,
  })
  @ApiBearerAuth()
  async getpersonalProfile() {}

  //기업 회원 프로필 조회
  @Get('/enterprise/profile')
  @ApiOperation({ summary: '기업 회원 프로필 조회 API' })
  @ApiOkResponse({
    description: '기업 회원 프로필 조회 성공',
    type: SelectProfileEnterpriseOutputDto,
  })
  @ApiBearerAuth()
  async getenterpriseProfile() {}

  //개인 회원 프로필 등록
  @Put('/personal/upload/profile')
  @ApiOperation({ summary: '개인 회원 프로필 등록 API' })
  @ApiBody({
    description: '등록 할 프로필 정보',
    type: ProfilePersonalInputDto,
  })
  @ApiOkResponse({
    description: '개인 회원 프로필 등록 성공',
    type: ProfilePersonalOutputDto,
  })
  @ApiBearerAuth()
  async personalProfile() {}

  //기업 회원 프로필 등록
  @Put('/enterprise/upload/profile')
  @ApiOperation({ summary: '기업 회원 프로필 등록 API' })
  @ApiBody({
    description: '등록 할 프로필 정보',
    type: ProfileEnterpriseInputDto,
  })
  @ApiOkResponse({
    description: '기업 회원 프로필 등록 성공',
    type: ProfileEnterpriseOutputDto,
  })
  @ApiBearerAuth()
  async enterpriseProfile() {}

  //개인 회원 프로필 수정
  @Put('/personal/edit/profile')
  @ApiOperation({ summary: '개인 회원 프로필 수정 API' })
  @ApiBody({
    description: '수정 할 프로필 정보',
    type: EditProfilePersonalInputDto,
  })
  @ApiOkResponse({
    description: '개인 회원 프로필 수정 성공',
    type: EditProfilePersonalOutputDto,
  })
  @ApiBearerAuth()
  async personalEditProfile() {}

  //기업 회원 프로필 수정
  @Put('/enterprise/edit/profile')
  @ApiOperation({ summary: '기업 회원 프로필 수정 API' })
  @ApiBody({
    description: '수정 할 프로필 정보',
    type: EditProfileEnterpriseInputDto,
  })
  @ApiOkResponse({
    description: '기업 회원 프로필 수정 성공',
    type: EditProfileEnterpriseOutputDto,
  })
  @ApiBearerAuth()
  async enterpriseEditProfile() {}

  //기업 회원 프로필 이미지 등록
  @Patch('/enterprise/upload/profile/image')
  @ApiOperation({ summary: '기업 회원 프로필 이미지 등록 API' })
  @ApiOkResponse({
    description: '기업 회원 프로필 이미지 등록 성공',
    type: ProfileImageEnterpriseOutputDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '등록 할 이미지 파일',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  async enterpriseProfileImage(@UploadedFile('file') file) {}

  //개인 회원 비밀번호 변경
  @Patch('/personal/password/:password')
  @ApiOperation({ summary: '개인 회원 비밀번호 변경 API' })
  @ApiParam({
    name: 'password',
    example: '$2a$10$57qAQNibiL0DChHArBwNj.RKeWUny19Men6GQW76WIhCx84gkxuXi',
    description: '변경할 비밀번호',
  })
  @ApiOkResponse({
    description: '비밀번호 변경 성공',
    type: PasswordPersonalOutputDto,
  })
  @ApiBearerAuth()
  async personalPassword() {}

  //기업 회원 비밀번호 변경
  @Patch('/enterprise/password/:password')
  @ApiOperation({ summary: '기업 회원 비밀번호 변경 API' })
  @ApiParam({
    name: 'password',
    example: '$2a$10$57qAQNibiL0DChHArBwNj.RKeWUny19Men6GQW76WIhCx84gkxuXi',
    description: '변경할 비밀번호',
  })
  @ApiOkResponse({
    description: '비밀번호 변경 성공',
    type: PasswordEnterpriseOutputDto,
  })
  @ApiBearerAuth()
  async enterprisePassword() {}

  // //개인 프로필 정보 보내기 API
  // @ApiOperation({ summary: '개인 프로필 정보 보내기 API' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  // @UsePipes(ValidationPipe)
  // @Post('/personal/profile')
  // async personalUser(
  //   @Body() createPersonalUserDto: CreatePersonalUserDto,
  //   @GetUser() user: User,
  // ): Promise<UserPersonal> {
  //   return await this.authService.personalUser(createPersonalUserDto, user);
  // }

  // //기업 프로필 정보 보내기 API
  // @ApiOperation({ summary: '기업 프로필 정보 보내기 API' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  // @UsePipes(ValidationPipe)
  // @Post('/enterprise/profile')
  // async enterpriseUser(
  //   @Body() createEnterpriseUserDto: CreateEnterpriseUserDto,
  //   @GetUser() user: User,
  // ): Promise<UserEnterprise> {
  //   return await this.authService.enterpriseUser(createEnterpriseUserDto, user);
  // }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // async test(@GetUser() user: User) {
  //   console.log('req', user);
  //   return await user;
  // }
}
