import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobEnterpriseRegisterInputDto {
  @ApiProperty({ example: '채용제목' })
  title: string;

  @ApiProperty({ example: '모집직종' })
  job_type_desc: string;

  @ApiProperty({ example: '모집인원' })
  require_count: string;

  @ApiProperty({ example: '직무내용' })
  job_desc: string;

  @ApiProperty({ example: '학력' })
  education: string;

  @ApiProperty({ example: '경력' })
  career: string;

  @ApiProperty({ example: '경력기간' })
  career_period: string;

  @ApiProperty({ example: '근무예정지' })
  work_area: string;

  @ApiProperty({ example: '근무예정지 주소' })
  work_address: string;

  @ApiProperty({ example: '소속산업단지' })
  work_area_desc: string;

  @ApiProperty({ example: '고용형태' })
  employType: string;

  @ApiProperty({ example: '고용형태상세' })
  employType_det: string;

  @ApiProperty({ example: '임금 지급형태' })
  paycd: string;

  @ApiProperty({ example: '임금금액' })
  pay_amount: string;

  @ApiProperty({ example: '근무시간유형' })
  work_time_type: string;

  @ApiProperty({ example: '식사제공' })
  meal_cod: string;

  @ApiProperty({ example: '1주당근로시간' })
  workingHours: string;

  @ApiProperty({ example: '퇴직금형태' })
  severance_pay_type: string;

  @ApiProperty({ example: '사회보험' })
  social_insurance: string;

  @ApiProperty({ example: '접수마감일구분' })
  closing_type: string;

  @ApiProperty({ example: '접수마감일' })
  end_reception: string;

  @ApiProperty({ example: '접수방법' })
  apply_method: string;

  @ApiProperty({ example: '접수방법 상세' })
  apply_method_etc: string;

  @ApiProperty({ example: '전형방법' })
  test_mthod: string;

  @ApiProperty({ example: '전형방법 상세' })
  test_method_etc: string;

  @ApiProperty({ example: '제출서류' })
  apply_document: string;

  @ApiProperty({ example: '채용담당자-성명' })
  contact_name: string;

  @ApiProperty({ example: '채용담당자-부서' })
  contact_department: string;

  @ApiProperty({ example: '채용담당자-전화번호' })
  contact_phone: string;

  @ApiProperty({ example: '채용담당자-이메일' })
  contact_email: string;

  @ApiProperty({ example: '사업체사진' })
  image: string;
}

export class JobDetailOutputDto {
  @ApiProperty({ example: '사업체명' })
  name: string;

  @ApiProperty({ example: '주소' })
  address: string;

  @ApiProperty({ example: '업종' })
  sector: string;

  @ApiProperty({ example: '대표자' })
  ceo: string;

  @ApiProperty({ example: '사원수' })
  quaternion: string;

  @ApiProperty({ example: '홈페이지' })
  web_site: string;

  @ApiProperty({ example: '채용제목' })
  title: string;

  @ApiProperty({ example: '모집직종' })
  job_type_desc: string;

  @ApiProperty({ example: '모집인원' })
  require_count: string;

  @ApiProperty({ example: '직무내용' })
  job_desc: string;

  @ApiProperty({ example: '학력' })
  education: string;

  @ApiProperty({ example: '경력' })
  career: string;

  @ApiProperty({ example: '경력기간' })
  career_period: string;

  @ApiProperty({ example: '근무예정지' })
  work_area: string;

  @ApiProperty({ example: '근무예정지 주소' })
  work_address: string;

  @ApiProperty({ example: '소속산업단지' })
  work_area_desc: string;

  @ApiProperty({ example: '고용형태' })
  employType: string;

  @ApiProperty({ example: '고용형태상세' })
  employType_det: string;

  @ApiProperty({ example: '임금 지급형태' })
  paycd: string;

  @ApiProperty({ example: '임금금액' })
  pay_amount: string;

  @ApiProperty({ example: '근무시간유형' })
  work_time_type: string;

  @ApiProperty({ example: '식사제공' })
  meal_cod: string;

  @ApiProperty({ example: '1주당근로시간' })
  workingHours: string;

  @ApiProperty({ example: '퇴직금형태' })
  severance_pay_type: string;

  @ApiProperty({ example: '사회보험' })
  social_insurance: string;

  @ApiProperty({ example: '접수마감일구분' })
  closing_type: string;

  @ApiProperty({ example: '접수마감일' })
  end_reception: string;

  @ApiProperty({ example: '접수방법' })
  apply_method: string;

  @ApiProperty({ example: '접수방법 상세' })
  apply_method_etc: string;

  @ApiProperty({ example: '전형방법' })
  test_mthod: string;

  @ApiProperty({ example: '전형방법 상세' })
  test_method_etc: string;

  @ApiProperty({ example: '제출서류' })
  apply_document: string;

  @ApiProperty({ example: '채용담당자-성명' })
  contact_name: string;

  @ApiProperty({ example: '채용담당자-부서' })
  contact_department: string;

  @ApiProperty({ example: '채용담당자-전화번호' })
  contact_phone: string;

  @ApiProperty({ example: '채용담당자-이메일' })
  contact_email: string;

  @ApiProperty({ example: '사업체사진' })
  image: string;
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
  @ApiProperty({ example: '사업체명' })
  name: string;

  @ApiProperty({ example: '주소' })
  address: string;

  @ApiProperty({ example: '업종' })
  sector: string;

  @ApiProperty({ example: '대표자' })
  ceo: string;

  @ApiProperty({ example: '사원수' })
  quaternion: string;

  @ApiProperty({ example: '홈페이지' })
  web_site: string;

  @ApiProperty({ example: '채용제목' })
  title: string;

  @ApiProperty({ example: '모집직종' })
  job_type_desc: string;

  @ApiProperty({ example: '모집인원' })
  require_count: string;

  @ApiProperty({ example: '직무내용' })
  job_desc: string;

  @ApiProperty({ example: '학력' })
  education: string;

  @ApiProperty({ example: '경력' })
  career: string;

  @ApiProperty({ example: '경력기간' })
  career_period: string;

  @ApiProperty({ example: '근무예정지' })
  work_area: string;

  @ApiProperty({ example: '근무예정지 주소' })
  work_address: string;

  @ApiProperty({ example: '소속산업단지' })
  work_area_desc: string;

  @ApiProperty({ example: '고용형태' })
  employType: string;

  @ApiProperty({ example: '고용형태상세' })
  employType_det: string;

  @ApiProperty({ example: '임금 지급형태' })
  paycd: string;

  @ApiProperty({ example: '임금금액' })
  pay_amount: string;

  @ApiProperty({ example: '근무시간유형' })
  work_time_type: string;

  @ApiProperty({ example: '식사제공' })
  meal_cod: string;

  @ApiProperty({ example: '1주당근로시간' })
  workingHours: string;

  @ApiProperty({ example: '퇴직금형태' })
  severance_pay_type: string;

  @ApiProperty({ example: '사회보험' })
  social_insurance: string;

  @ApiProperty({ example: '접수마감일구분' })
  closing_type: string;

  @ApiProperty({ example: '접수마감일' })
  end_reception: string;

  @ApiProperty({ example: '접수방법' })
  apply_method: string;

  @ApiProperty({ example: '접수방법 상세' })
  apply_method_etc: string;

  @ApiProperty({ example: '전형방법' })
  test_mthod: string;

  @ApiProperty({ example: '전형방법 상세' })
  test_method_etc: string;

  @ApiProperty({ example: '제출서류' })
  apply_document: string;

  @ApiProperty({ example: '채용담당자-성명' })
  contact_name: string;

  @ApiProperty({ example: '채용담당자-부서' })
  contact_department: string;

  @ApiProperty({ example: '채용담당자-전화번호' })
  contact_phone: string;

  @ApiProperty({ example: '채용담당자-이메일' })
  contact_email: string;
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
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '채용공고 등록 성공',
    description: '설명',
  })
  message: string;
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
  id: number;

  @ApiProperty({ example: '채용제목' })
  title: string;

  @ApiProperty({ example: '작성일' })
  created_at: string;

  @ApiProperty({ example: '심사요청일' })
  start_reception: string;

  @ApiProperty({ example: '비고란' })
  coments: string;
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

  @ApiProperty()
  data: JobEnterpriseOutputDto;
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