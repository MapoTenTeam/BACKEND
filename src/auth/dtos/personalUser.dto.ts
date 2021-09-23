import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

//개인 회원 회원가입 성공했을때
export class SignupPersonalOutputDto {
  @ApiProperty({
    example: '201',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '개인 회원가입 성공',
    description: '설명',
  })
  message: string;
}

//개인 회원 비밀번호 변경 성공했을때
export class PasswordPersonalOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '비밀 번호 변경 성공',
    description: '설명',
  })
  message: string;
}

//개인 회원 프로필 등록
export class ProfilePersonalInputDto {
  @ApiProperty({ example: '휴대폰 번호' })
  MOBLPHON_NO: string;

  @ApiProperty({ example: '주소' })
  ADRES: string;

  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;
}

//개인 회원 프로필 등록
export class ProfilePersonalOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '개인회원 프로필 등록 성공',
    description: '설명',
  })
  message: string;
}

//개인 회원 프로필 수정
export class EditProfilePersonalInputDto {
  @ApiProperty({ example: '이름' })
  MBER_NM: string;

  @ApiProperty({ example: '이메일' })
  MBER_EMAIL_ADRES: string;

  @ApiProperty({ example: '휴대폰번호' })
  MOBLPHON_NO: string;

  @ApiProperty({ example: '주소' })
  ADRES: string;

  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;
}

//개인 회원 프로필 수정
export class EditProfilePersonalOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '개인회원 프로필 수정 성공',
    description: '설명',
  })
  message: string;
}

//개인 회원 프로필 데이터
export class ProfileDetailPersonalOutputDto {
  @ApiProperty({ example: '이름' })
  MBER_NM: string;
  @ApiProperty({ example: '아이디' })
  MBER_ID: string;
  @ApiProperty({ example: '이메일' })
  MBER_EMAIL_ADRES: string;
  @ApiProperty({ example: '휴대폰번호' })
  MOBLPHON_NO: string;
  @ApiProperty({ example: '주소' })
  ADRES: string;
  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;
}

//개인 회원 프로필 조회
export class SelectProfilePersonalOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '개인 회원 프로필 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty()
  data: ProfileDetailPersonalOutputDto;
}
