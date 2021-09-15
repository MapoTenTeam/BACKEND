import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsPersonalDto {
  @ApiProperty({ example: '이름' })
  MBER_NM: string;

  @ApiProperty({ example: '아이디' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  MBER_ID: string;

  @ApiProperty({ example: '이메일' })
  MBER_EMAIL_ADRES: string;

  @ApiProperty({ example: '패스워드' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 가능한 유효성 검사
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  PASSWORD: string;

  @ApiProperty({ description: '이용약관 체크여부' })
  TERMS: boolean;
}

export class AuthCredentialsEnterpriseDto {
  @ApiProperty({ example: '사업체명' })
  CMPNY_NM: string;

  @ApiProperty({ example: '아이디' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  ENTRPRS_MBER_ID: string;

  @ApiProperty({ example: '이메일' })
  APPLCNT_EMAIL_ADRES: string;

  @ApiProperty({ example: '패스워드' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 가능한 유효성 검사
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  ENTRPRS_MBER_PASSWORD: string;

  @ApiProperty({ description: '이용약관 체크여부' })
  TERMS: boolean;

  @ApiProperty({ example: '담당자명' })
  APPLCNT_NM: string;

  @ApiProperty({ example: '사업자 등록번호' })
  BIZRNO: string;
}

export class LoginInputDto {
  @ApiProperty({ example: '아이디' })
  USER_ID: string;

  @ApiProperty({ example: '비밀번호' })
  PASSWORD: string;
}

export class LoginOutputDto {
  @ApiProperty({
    example: '200',
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
  token: string;
}
