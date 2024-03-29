import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class JobEnterpriseRegisterInputDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    name: 'file',
    required: false,
  })
  JOB_IM: string;

  @ApiProperty({ example: '채용제목' })
  @IsNotEmpty()
  TITLE: string;

  @ApiProperty({ example: '모집직종' })
  @IsNotEmpty()
  JOB_TYPE_DESC: string;

  @ApiProperty({ example: '모집인원' })
  @IsNotEmpty()
  REQUIRE_COUNT: string;

  @ApiProperty({ example: '직무내용' })
  @IsNotEmpty()
  JOB_DESC: string;

  @ApiProperty({ example: '학력(코드값)' })
  @IsNotEmpty()
  DEUCATION: string;

  @ApiProperty({ example: '경력(코드값)' })
  @IsNotEmpty()
  CAREER: string;

  @ApiProperty({ example: '경력기간' })
  CAREER_PERIOD: string;

  @ApiProperty({ example: '근무예정지(코드값)' })
  @IsNotEmpty()
  WORK_AREA: string;

  @ApiProperty({ example: '근무예정지 주소', required: false })
  WORK_ADDRESS: string;

  @ApiProperty({ example: '근무예정지 산업단지', required: false })
  WORK_AREA_DESC: string;

  @ApiProperty({ example: '고용형태(코드값)' })
  @IsNotEmpty()
  EMPLOYTYPE: string;

  @ApiProperty({ example: '고용형태상세(코드값)' })
  @IsNotEmpty()
  EMPLOYTYPE_DET: string;

  @ApiProperty({ example: '임금 지급형태(코드값)' })
  @IsNotEmpty()
  PAYCD: string;

  @ApiProperty({ example: '임금금액' })
  @IsNotEmpty()
  PAY_AMOUNT: string;

  @ApiProperty({ example: '근무시간유형(코드값)' })
  @IsNotEmpty()
  WORK_TIME_TYPE: string;

  @ApiProperty({ example: '식사제공(코드값)' })
  @IsNotEmpty()
  @MaxLength(5)
  MEAL_COD: string;

  @ApiProperty({ example: '1주당근로시간' })
  @IsNotEmpty()
  @MaxLength(5)
  WORKINGHOURS: string;

  @ApiProperty({ example: '퇴직금형태(코드값)' })
  @IsNotEmpty()
  SEVERANCE_PAY_TYPE: string;

  @ApiProperty({ example: '사회보험(코드값)' })
  @IsNotEmpty()
  SOCIAL_INSURANCE: string;

  @ApiProperty({ example: '접수마감일구분(코드값)' })
  @IsNotEmpty()
  CLOSING_TYPE: string;

  @ApiProperty({ example: '접수마감일', required: false })
  ENDRECEPTION: string;

  @ApiProperty({ example: '접수방법(코드값)' })
  @IsNotEmpty()
  APPLY_METHOD: string;

  @ApiProperty({ example: '접수방법 상세' })
  APPLY_METHOD_ETC: string;

  @ApiProperty({ example: '전형방법(코드값)' })
  @IsNotEmpty()
  TEST_METHOD: string;

  @ApiProperty({ example: '전형방법 상세' })
  TEST_METHOD_DTC: string;

  @ApiProperty({ example: '제출서류(코드값)' })
  @IsNotEmpty()
  APPLY_DOCUMENT: string;

  @ApiProperty({ example: '채용담당자 성명' })
  @IsNotEmpty()
  CONTACT_NAME: string;

  @ApiProperty({ example: '채용담당자 부서' })
  @IsNotEmpty()
  CONTACT_DEPARTMENT: string;

  @ApiProperty({ example: '채용담당자 전화번호' })
  @IsNotEmpty()
  CONTACT_PHONE: string;

  @ApiProperty({ example: '채용담당자 이메일' })
  @IsNotEmpty()
  CONTACT_EMAIL: string;
}

export class JobDetailOutputDto {
  @ApiProperty({ example: '일자리정보ID' })
  JOBID: number;
  @ApiProperty({ example: '사업체명' })
  CMPNY_NM: string;
  @ApiProperty({ example: '사업자 등록번호' })
  BIZRNO: string;
  @ApiProperty({ example: '대표' })
  CEO: string;
  @ApiProperty({ example: '주소' })
  ADRES: string;
  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;
  @ApiProperty({ example: '업종' })
  INDUTY: string;
  @ApiProperty({ example: '인원수' })
  NMBR_WRKRS: string;
  @ApiProperty({ example: '회사이미지' })
  CMPNY_IM: string;
  @ApiProperty({ example: '채용제목' })
  TITLE: string;
  @ApiProperty({ example: '모집직종' })
  JOB_TYPE_DESC: string;
  @ApiProperty({ example: '모집인원' })
  REQUIRE_COUNT: string;
  @ApiProperty({ example: '직무내용' })
  JOB_DESC: string;
  @ApiProperty({ example: '학력' })
  DEUCATION: string;
  @ApiProperty({ example: '경력' })
  CAREER: string;
  @ApiProperty({ example: '근무예정지' })
  WORK_AREA: string;
  @ApiProperty({ example: '고용형태' })
  EMPLOYTYPE: string;
  @ApiProperty({ example: ['고용형태상세'] })
  EMPLOYTYPE_DET: string;
  @ApiProperty({ example: '임금지급형태' })
  PAYCD: string;
  @ApiProperty({ example: '근무시간유형' })
  WORK_TIME_TYPE: string;
  @ApiProperty({ example: '접수마감일' })
  ENDRECEPTION: string;
  @ApiProperty({ example: '경력기간' })
  CAREER_PERIOD: string;
  @ApiProperty({ example: '근무예정지 주소' })
  WORK_ADDRESS: string;
  @ApiProperty({ example: '근무예정지 산업단지' })
  WORK_AREA_DESC: string;
  @ApiProperty({ example: '임금금액' })
  PAY_AMOUNT: string;
  @ApiProperty({ example: '식사제공' })
  MEAL_COD: string;
  @ApiProperty({ example: '1주당근로시간' })
  WORKINGHOURS: string;
  @ApiProperty({ example: '퇴직금형태' })
  SEVERANCE_PAY_TYPE: string;
  @ApiProperty({ example: ['사회보험'] })
  SOCIAL_INSURANCE: string;
  @ApiProperty({ example: '접수마감일구분' })
  CLOSING_TYPE: string;
  @ApiProperty({ example: ['접수방법'] })
  APPLY_METHOD: string;
  @ApiProperty({ example: '접수방법 상세' })
  APPLY_METHOD_ETC: string;
  @ApiProperty({ example: ['전형방법'] })
  TEST_METHOD: string;
  @ApiProperty({ example: '전형방법 상세' })
  TEST_METHOD_DTC: string;
  @ApiProperty({ example: ['제출서류'] })
  APPLY_DOCUMENT: string;
  @ApiProperty({ example: '채용담당자 성명' })
  CONTACT_NAME: string;
  @ApiProperty({ example: '채용담당자 부서' })
  CONTACT_DEPARTMENT: string;
  @ApiProperty({ example: '채용담당자 전화번호' })
  CONTACT_PHONE: string;
  @ApiProperty({ example: '채용담당자 이메일' })
  CONTACT_EMAIL: string;
}

export class SelectJobDetailOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '상세페이지 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty()
  data: JobDetailOutputDto;
}

export class JobEnterpriseDetailOutputDto {
  @ApiProperty({ example: '채용공고ID' })
  JOBID: number;
  @ApiProperty({ example: '사업체명' })
  CMPNY_NM: string;
  @ApiProperty({ example: '사업자등록번호' })
  BIZRNO: string;
  @ApiProperty({ example: '대표' })
  CEO: string;
  @ApiProperty({ example: '주소' })
  ADRES: string;
  @ApiProperty({ example: '상세주소' })
  DETAIL_ADRES: string;
  @ApiProperty({ example: '업종' })
  INDUTY: string;
  @ApiProperty({ example: '사원수' })
  NMBR_WRKRS: string;
  @ApiProperty({ example: '로고이미지' })
  CMPNY_IM: string;
  @ApiProperty({ example: '일자리이미지' })
  JOB_IM: string;
  @ApiProperty({ example: '채용제목' })
  TITLE: string;
  @ApiProperty({ example: '모집직종' })
  JOB_TYPE_DESC: string;
  @ApiProperty({ example: '모집인원' })
  REQUIRE_COUNT: string;
  @ApiProperty({ example: '직무내용' })
  JOB_DESC: string;
  @ApiProperty({ example: '학력' })
  DEUCATION: string;
  @ApiProperty({ example: '경력' })
  CAREER: string;
  @ApiProperty({ example: '경력기간' })
  CAREER_PERIOD: string;
  @ApiProperty({ example: '근무예정지' })
  WORK_AREA: string;
  @ApiProperty({ example: '근무예정지 주소' })
  WORK_ADDRESS: string;
  @ApiProperty({ example: '소속산업단지' })
  WORK_AREA_DESC: string;
  @ApiProperty({ example: '고용형태' })
  EMPLOYTYPE: string;
  @ApiProperty({ example: ['고용형태상세'] })
  EMPLOYTYPE_DET: string;
  @ApiProperty({ example: '임금 지급형태' })
  PAYCD: string;
  @ApiProperty({ example: '임금금액' })
  PAY_AMOUNT: string;
  @ApiProperty({ example: '근무시간유형' })
  WORK_TIME_TYPE: string;
  @ApiProperty({ example: '식사제공' })
  MEAL_COD: string;
  @ApiProperty({ example: '1주당근로시간' })
  WORKINGHOURS: string;
  @ApiProperty({ example: '퇴직금형태' })
  SEVERANCE_PAY_TYPE: string;
  @ApiProperty({ example: ['사회보험'] })
  SOCIAL_INSURANCE: string;
  @ApiProperty({ example: '접수마감일구분' })
  CLOSING_TYPE: string;
  @ApiProperty({ example: '접수기간시작' })
  STARTRECEPTION: string;
  @ApiProperty({ example: '접수마감일' })
  ENDRECEPTION: string;
  @ApiProperty({ example: ['접수방법'] })
  APPLY_METHOD: string;
  @ApiProperty({ example: '접수방법 상세' })
  APPLY_METHOD_ETC: string;
  @ApiProperty({ example: ['전형방법'] })
  TEST_METHOD: string;
  @ApiProperty({ example: '전형방법 상세' })
  TEST_METHOD_DTC: string;
  @ApiProperty({ example: ['제출서류'] })
  APPLY_DOCUMENT: string;
  @ApiProperty({ example: '채용담당자-성명' })
  CONTACT_NAME: string;
  @ApiProperty({ example: '채용담당자-부서' })
  CONTACT_DEPARTMENT: string;
  @ApiProperty({ example: '채용담당자-전화번호' })
  CONTACT_PHONE: string;
  @ApiProperty({ example: '채용담당자-이메일' })
  CONTACT_EMAIL: string;
}

export class SelectJobEnterpriseDetailOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '상세페이지 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty()
  data: JobEnterpriseDetailOutputDto;
}

export class JobEnterpriseRegisterOutputDto {
  @ApiProperty({
    example: '201',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 등록 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: '1',
    description: '설명',
  })
  jobid: number;
}

export class JobEnterpriseJudgeOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 심사요청 성공',
    description: '설명',
  })
  message: string;
}

export class JobEnterpriseOutputDto {
  @ApiProperty({ example: '일자리정보ID' })
  JOBID: number;

  @ApiProperty({ example: '채용제목' })
  TITLE: string;

  @ApiProperty({ example: '작성일' })
  CREATE_AT: string;

  @ApiProperty({ example: '심사요청일' })
  REQUEST_DATE: string;

  @ApiProperty({ example: '비고란' })
  COMENTS: string;

  @ApiProperty({ example: '승인상태 코드값' })
  JOB_STAT_CODE: string;

  @ApiProperty({ example: '승인상태 이름' })
  JOB_STAT_NAME: string;
}

export class SelectJobEnterpriseOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 목록 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({ description: '프로필 등록된 데이터 있을경우', example: true })
  ok: boolean;

  @ApiProperty({ description: '페이지 넘버', example: '총갯수' })
  count: number;

  @ApiProperty({ example: ['채용공고 목록 데이터'] })
  data: JobEnterpriseOutputDto;
}

export class SelectJobEnterpriseOutputNotDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 등록 필요',
    description: '설명',
  })
  message: string;

  @ApiProperty({ description: '프로필 등록된 데이터 없경우', example: false })
  ok: boolean;
}

export class UpdateJobEnterpriseOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 수정 성공',
    description: '설명',
  })
  message: string;
}

export class DeleteJobEnterpriseOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 삭제 성공',
    description: '설명',
  })
  message: string;
}
