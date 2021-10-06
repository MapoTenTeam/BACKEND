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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  GetUserByIdDto,
  GetUserByIdFindInputDto,
  GetUserByIdFindOutputDto,
  GetUserByIdNotDto,
} from './dtos/response/getUserById.dto';
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
  ProfilePersonalInputDto,
  ProfilePersonalOutputDto,
  SelectProfilePersonalOutputDto,
  SignupPersonalOutputDto,
} from './dtos/personalUser.dto';
import {
  PatchAprblEnterpriseOutputDto,
  ProfileEnterpriseDivisionOutputDto,
  ProfileEnterpriseInputDto,
  ProfileEnterpriseOutputDto,
  ProfileImageEnterpriseOutputDto,
  SelectProfileEnterpriseOutputDto,
  SignupEnterpriseOutputDto,
} from './dtos/enterpriseUser.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  AuthCredentialsEnterpriseDto,
  AuthCredentialsPersonalDto,
  LoginInputDto,
  LoginOutputDto,
  PasswordChangeInputDto,
  PasswordChangeOutputDto,
  PasswordConfirmInputDto,
  PasswordConfirmOutputFailDto,
  PasswordConfirmOutputSuccessDto,
  TermsOutputDto,
} from './dtos/auth-credential.dto';
import {
  GetUserByBizrnoDto,
  GetUserByBizrnoNotDto,
} from './dtos/response/getUserByBizrno.dto';
import { multerOptions } from './multerOptions';

@ApiTags('유저 API')
@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  //유저ID 중복체크 API
  @Get('/duplicate/id/:userid')
  @ApiOperation({ summary: '유저 아이디 중복체크 API(완료)*' })
  @ApiParam({
    name: 'userid',
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
  async getUserById(
    @Param() param: { userid: string },
  ): Promise<GetUserByIdNotDto> {
    return await this.authService.getUserById(param);
  }

  //유저 이메일 중복체크 API
  @Get('/duplicate/email/:email')
  @ApiOperation({ summary: '유저 이메일 중복체크 API(완료)*' })
  @ApiParam({
    name: 'email',
    example: 'hee1234@gmail.com',
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
  // @ApiResponse({
  //   status: 400,
  //   description: '이메일 형태가 아닙니다.',
  // })
  async getUserByEmail(@Param() param: { email: string }) {
    return await this.authService.getUserByEmail(param);
  }

  //사업자등록번호 중복체크 API
  @ApiOperation({ summary: '사업자등록번호 중복체크 API(완료)*' })
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
  async getUserBybizrno(
    @Param() param: { bizrno: string },
  ): Promise<GetUserByBizrnoNotDto> {
    return await this.authService.getUserBybizrno(param);
  }

  //유저 아이디 찾기
  @ApiOperation({ summary: '유저 아이디 찾기 API(완료)*' })
  @ApiBody({
    description: '유저 정보',
    type: GetUserByIdFindInputDto,
  })
  @ApiResponse({
    status: 200,
    description: '유저 아이디 찾기 성공',
    type: GetUserByIdFindOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '회원정보가 없습니다.',
  })
  @Post('/find/id')
  async getUserByIdFind(
    @Body(ValidationPipe)
    getUserByIdFindInputDto: GetUserByIdFindInputDto,
  ): Promise<GetUserByIdFindOutputDto> {
    return await this.authService.getUserByIdFind(getUserByIdFindInputDto);
  }

  //개인회원 패스워드 찾기(임시비밀번호 생성)
  @ApiOperation({
    summary: '개인회원 패스워드 찾기(임시비밀번호 생성) API(완료)*',
  })
  @ApiBody({
    description: '유저 정보',
    type: GetUserByPasswordFindInputDto,
  })
  @ApiOkResponse({
    description: '임시 비밀번호 생성 성공',
    type: GetUserByPasswordFindOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '회원정보가 없습니다.',
  })
  @Post('/find/personal/password')
  async getpersonalByPasswordFind(
    @Body(ValidationPipe)
    getUserByPasswordFindInputDto: GetUserByPasswordFindInputDto,
  ) {
    return await this.authService.getpersonalByPasswordFind(
      getUserByPasswordFindInputDto,
    );
  }

  //기업회원 패스워드 찾기(임시비밀번호 생성)
  @ApiOperation({
    summary: '기업회원 패스워드 찾기(임시비밀번호 생성) API(완료)*',
  })
  @ApiBody({
    description: '유저 정보',
    type: GetUserByPasswordFindInputDto,
  })
  @ApiOkResponse({
    description: '임시 비밀번호 생성 성공',
    type: GetUserByPasswordFindOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '회원정보가 없습니다.',
  })
  @Post('/find/enterprise/password')
  async getenterpriseByPasswordFind(
    @Body(ValidationPipe)
    getUserByPasswordFindInputDto: GetUserByPasswordFindInputDto,
  ) {
    return await this.authService.getenterpriseByPasswordFind(
      getUserByPasswordFindInputDto,
    );
  }

  //이용 약관 조회
  @ApiOperation({ summary: '이용 약관 API(완료)' })
  @ApiOkResponse({
    description: '이용약관 조회 성공',
    type: TermsOutputDto,
  })
  @Get('/terms')
  async getTerms() {
    return await this.authService.getTerms();
  }

  //개인 회원 탈퇴하기
  @Delete('/personal')
  @ApiOperation({ summary: '개인 회원 탈퇴 API(완료)*' })
  @ApiOkResponse({
    description: '회원 탈퇴 성공',
    type: GetUserByDeleteOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deletePersonalUser(@Req() req) {
    return await this.authService.deletePersonalUser(req.user);
  }

  //기업 회원 탈퇴하기
  @Delete('/enterprise')
  @ApiOperation({ summary: '기업 회원 탈퇴 API(완료)*' })
  @ApiOkResponse({
    description: '회원 탈퇴 성공',
    type: GetUserByDeleteOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteEnterpriseUser(@Req() req) {
    return await this.authService.deleteEnterpriseUser(req.user);
  }

  //이메일 인증
  @Post('/auth/email/:email')
  @ApiOperation({ summary: '이메일 인증 API(완료)*' })
  @ApiParam({
    name: 'email',
    example: 'hee1234@gmail.com',
    description: '인증 받을 이메일',
  })
  @ApiResponse({
    status: 201,
    description: '인증번호',
    type: GetUserByEmailAuthDto,
  })
  async emailAuth(@Param() param: { email: string }) {
    return await this.authService.emailAuth(param);
  }

  //개인 회원가입 API
  @Post('/personal/signup')
  @ApiOperation({ summary: '개인 회원 가입 API(수정예정)*' })
  @ApiBody({
    description: '유저 정보',
    type: AuthCredentialsPersonalDto,
  })
  @ApiResponse({
    status: 201,
    description: '개인 회원가입 성공',
    type: SignupPersonalOutputDto,
  })
  @ApiResponse({
    status: 406,
    description: '이메일 인증 or 이용약관 동의 실패',
  })
  @ApiResponse({
    status: 409,
    description: '중복된 ID가 있습니다.',
  })
  async personalSignUp(
    @Body(ValidationPipe)
    authCredentialsPersonalDto: AuthCredentialsPersonalDto,
  ): Promise<void> {
    return await this.authService.personalSignUp(authCredentialsPersonalDto);
  }

  // 기업 회원가입 API
  @Post('/enterprise/signup')
  @ApiOperation({ summary: '기업 회원 가입 API(수정예정)*' })
  @ApiBody({ description: '유저 정보', type: AuthCredentialsEnterpriseDto })
  @ApiResponse({
    status: 201,
    description: '기업 회원가입 성공',
    type: SignupEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 406,
    description: '이메일 인증 or 이용약관 동의 실패',
  })
  @ApiResponse({
    status: 409,
    description: '중복된 ID가 있습니다.',
  })
  async enterpriseSignUp(
    @Body(ValidationPipe)
    authCredentialsEnterpriseDto: AuthCredentialsEnterpriseDto,
  ): Promise<void> {
    return await this.authService.enterpriseSignUp(
      authCredentialsEnterpriseDto,
    );
  }

  // 로그인 API
  @Post('/signin')
  @ApiOperation({ summary: '로그인 API(수정예정)*' })
  @ApiBody({ description: '유저 정보', type: LoginInputDto })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: LoginOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  })
  async siginIn(
    @Body(ValidationPipe) loginInputDto: LoginInputDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(loginInputDto);
  }

  //개인 회원 프로필 조회
  @Get('/personal/profile')
  @ApiOperation({ summary: '개인 회원 프로필 조회 API(완료)*' })
  @ApiOkResponse({
    description: '개인 회원 프로필 조회 성공',
    type: SelectProfilePersonalOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getPersonalProfile(@Req() req) {
    return await this.authService.getPersonalProfile(req.user);
  }

  //기업 회원 프로필 조회
  @Get('/enterprise/profile')
  @ApiOperation({ summary: '기업 회원 프로필 조회 API(완료)*' })
  @ApiOkResponse({
    description: '기업 회원 프로필 조회 성공',
    type: SelectProfileEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getEnterpriseProfile(@Req() req) {
    return await this.authService.getEnterpriseProfile(req.user);
  }

  //기업회원 프로필 기업유형 조회
  @Get('/enterprise/division')
  @ApiOperation({ summary: '기업회원 프로필 기업유형 조회 API(완료)*' })
  @ApiOkResponse({
    description: '기업회원 프로필 기업유형 조회 성공',
    type: ProfileEnterpriseDivisionOutputDto,
  })
  async getEnterpriseDivision() {
    return await this.authService.getEnterpriseDivision();
  }

  //개인 회원 프로필 등록 or 수정
  @Put('/personal/upload/profile')
  @ApiOperation({ summary: '개인 회원 프로필 등록 or 수정 API(완료)*' })
  @ApiBody({
    description: '등록 할 프로필 정보',
    type: ProfilePersonalInputDto,
  })
  @ApiOkResponse({
    description: '개인 회원 프로필 등록 성공',
    type: ProfilePersonalOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async personalUploadProfile(
    @Req() req,
    @Body(ValidationPipe) profilePersonalInputDto: ProfilePersonalInputDto,
  ) {
    return await this.authService.personalUploadProfile(
      req.user,
      profilePersonalInputDto,
    );
  }

  //기업 회원 프로필 등록 or 수정
  @Put('/enterprise/upload/profile')
  @ApiOperation({ summary: '기업 회원 프로필 등록 or 수정 API(완료)*' })
  @ApiBody({
    description: '등록 할 프로필 정보',
    type: ProfileEnterpriseInputDto,
  })
  @ApiOkResponse({
    description: '기업 회원 프로필 등록 성공',
    type: ProfileEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseProfile(
    @Req() req,
    @Body(ValidationPipe) profileEnterpriseInputDto: ProfileEnterpriseInputDto,
  ) {
    return await this.authService.enterpriseProfile(
      req.user,
      profileEnterpriseInputDto,
    );
  }

  //기업 회원 프로필 이미지 등록 or 수정
  @Post('/enterprise/upload/profile/image')
  @ApiOperation({ summary: '기업 로고 이미지 등록 or 수정 API(완료)*' })
  @ApiResponse({
    status: 201,
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
  @ApiResponse({
    status: 400,
    description: '지원하지 않는 이미지 형식',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiResponse({
    status: 404,
    description: '이미지 등록 실패',
  })
  @ApiResponse({
    status: 413,
    description: '파일크기 제한',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async enterpriseProfileImage(@Req() req, @UploadedFiles() files: string) {
    return await this.authService.enterpriseProfileImage(req.user, files);
  }

  //기업 사업자 승인 요청
  @Patch('/enterprise/approval')
  @ApiOperation({ summary: '사업자 승인 요청 API(완료)*' })
  @ApiOkResponse({
    description: '사업자 승인 요청 성공',
    type: PatchAprblEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseBusinessApproval(@Req() req) {
    return await this.authService.enterpriseBusinessApproval(req.user);
  }

  //회원 비밀번호 확인
  @Post('/personal/change/password')
  @ApiOperation({ summary: '회원 비밀번호 확인 API(완료)*' })
  @ApiBody({
    description: '비밀번호 입력',
    type: PasswordConfirmInputDto,
  })
  @ApiResponse({
    status: 200,
    description: '비밀번호 조회 성공',
    type: PasswordConfirmOutputSuccessDto,
  })
  @ApiResponse({
    status: 400,
    description: '비밀번호 조회 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getPasswordConfirm(
    @Req() req,
    @Body(ValidationPipe) passwordConfirmInputDto: PasswordConfirmInputDto,
  ) {
    return await this.authService.getPasswordConfirm(
      req.user,
      passwordConfirmInputDto,
    );
  }

  //개인 회원 비밀번호 변경
  @Patch('/personal/change/password')
  @ApiOperation({ summary: '개인 회원 비밀번호 변경 API(완료)*' })
  @ApiBody({
    description: '변경할 비밀번호',
    type: PasswordChangeInputDto,
  })
  @ApiOkResponse({
    description: '비밀번호 변경 성공',
    type: PasswordChangeOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async personalPasswordChange(
    @Req() req,
    @Body(ValidationPipe) passwordChangeInputDto: PasswordChangeInputDto,
  ) {
    return await this.authService.personalPasswordChange(
      req.user,
      passwordChangeInputDto,
    );
  }

  //기업 회원 비밀번호 변경
  @Patch('/enterprise/change/password/')
  @ApiOperation({ summary: '기업 회원 비밀번호 변경 API(완료)*' })
  @ApiBody({
    description: '변경할 비밀번호',
    type: PasswordChangeInputDto,
  })
  @ApiOkResponse({
    description: '비밀번호 변경 성공',
    type: PasswordChangeOutputDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterprisePasswordChange(
    @Req() req,
    @Body(ValidationPipe) passwordChangeInputDto: PasswordChangeInputDto,
  ) {
    return await this.authService.enterprisePasswordChange(
      req.user,
      passwordChangeInputDto,
    );
  }
}
