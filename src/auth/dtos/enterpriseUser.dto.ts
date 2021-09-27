import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

//기업회원 회원가입
export class SignupEnterpriseOutputDto {
  @ApiProperty({
    example: '201',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '기업 회원가입 성공',
    description: '설명',
  })
  message: string;
}

//기업 회원 프로필 등록
export class ProfileEnterpriseInputDto {
  @ApiProperty({ example: '대표자' })
  CXFC: string;

  @ApiProperty({ example: '주소' })
  ADRES: string;

  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;

  @ApiProperty({ example: '업종' })
  INDUTY: string;

  @ApiProperty({ example: '근로자 수' })
  NMBR_WRKRS: string;

  @ApiProperty({ example: '홈페이지 주소' })
  WEB_ADRES: string;

  @ApiProperty({ example: '회사대표 이메일' })
  CEO_EMAIL_ADRES: string;
}

//기업 회원 프로필 등록
export class ProfileEnterpriseOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '기업회원 프로필 등록 성공',
    description: '설명',
  })
  message: string;
}

//기업 회원 프로필 이미지 등록
export class ProfileImageEnterpriseOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '기업회원 프로필 이미지 등록 성공',
    description: '설명',
  })
  message: string;
}

//기업 회원 프로필 데이터
export class ProfileDetailEnterpriseOutputDto {
  @ApiProperty({ example: '이름' })
  APPLCNT_NM: string;
  @ApiProperty({ example: '아이디' })
  ENTRPRS_MBER_ID: string;
  @ApiProperty({ description: '사업자 등록번호 승인여부' })
  VERIFY: boolean;
  @ApiProperty({ example: '신청자 이메일' })
  APPLCNT_EMAIL_ADRES: string;
  @ApiProperty({ example: '사업체명' })
  CMPNY_NM: string;
  @ApiProperty({ example: '사업자 등록번호' })
  BIZRNO: string;
  @ApiProperty({ example: '대표자' })
  CXFC: string;
  @ApiProperty({ example: '주소' })
  ADRES: string;
  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;
  @ApiProperty({ example: '업종' })
  INDUTY: string;
  @ApiProperty({ example: '근로자 수' })
  NMBR_WRKRS: string;
  @ApiProperty({ example: '홈페이지 주소' })
  WEB_ADRES: string;
  @ApiProperty({ example: '회사대표 이메일' })
  CEO_EMAIL_ADRES: string;
  @ApiProperty({ example: '회사 이미지' })
  CMPNY_IM: string;
}

//기업 회원 프로필 조회
export class SelectProfileEnterpriseOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '기업 회원 프로필 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty()
  data: ProfileDetailEnterpriseOutputDto;
}
