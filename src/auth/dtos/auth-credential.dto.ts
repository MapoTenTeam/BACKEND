import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

//개인회원 회원가입
export class AuthCredentialsPersonalDto {
  @ApiProperty({ example: '이름' })
  @IsString()
  @IsNotEmpty()
  MBER_NM: string;

  @ApiProperty({ example: '아이디' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  MBER_ID: string;

  @ApiProperty({ example: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  MBER_EMAIL_ADRES: string;

  @ApiProperty({ example: '패스워드' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{20,}$/, {
    message: 'password hash error',
  })
  PASSWORD: string;

  @ApiProperty({ description: '이메일 인증 여부' })
  @IsNotEmpty()
  EMAIL_VRFCT: boolean;

  @ApiProperty({ description: '이용약관 체크여부' })
  @IsNotEmpty()
  TERMS: boolean;
}

//기업회원 회원가입
export class AuthCredentialsEnterpriseDto {
  @ApiProperty({ example: '회사명' })
  @IsString()
  @IsNotEmpty()
  CMPNY_NM: string;

  @ApiProperty({ example: '아이디' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  ENTRPRS_MBER_ID: string;

  @ApiProperty({ example: '신청자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  APPLCNT_EMAIL_ADRES: string;

  @ApiProperty({ example: '패스워드' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{20,}$/, {
    message: 'password hash error',
  })
  ENTRPRS_MBER_PASSWORD: string;

  @ApiProperty({ example: '신청인명' })
  @IsString()
  @IsNotEmpty()
  APPLCNT_NM: string;

  @ApiProperty({ example: '사업자 등록번호' })
  @IsNotEmpty()
  BIZRNO: string;

  @ApiProperty({ description: '이메일 인증 여부' })
  @IsNotEmpty()
  EMAIL_VRFCT: boolean;

  @ApiProperty({ description: '이용약관 체크여부' })
  @IsNotEmpty()
  TERMS: boolean;
}

//로그인 InputDto
export class LoginInputDto {
  @ApiProperty({ example: '아이디' })
  @IsString()
  @IsNotEmpty()
  USER_ID: string;

  @ApiProperty({ example: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{20,}$/, {
    message: 'password hash error',
  })
  PASSWORD: string;
}

//로그인 OutputDto
export class LoginOutputDto {
  @ApiProperty({
    example: '201',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '로그인 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWZlZnNlMTEyNSIsImlhdCI6MTYzMTA4OTQyNn0.m4gl3atBiQZWnWCJlvxjvVeyPO-JN6_cR2pcgcovyKo',
    description: '토큰',
  })
  accessToken: string;
}

export class TermsOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '이용약관 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: '서비스 이용약관',
    description: '서비스 이용약관',
  })
  terms: string;

  @ApiProperty({
    example: '개인정보 수집 및 이용',
    description: '개인정보 수집 및 이용',
  })
  agree: string;
}
