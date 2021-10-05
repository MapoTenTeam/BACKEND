import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobPublicOutputDto {
  @ApiProperty({ example: '일자리정보ID' })
  JOBID: number;

  @ApiProperty({ example: '사업체이름' })
  CMPNY_NM: string;

  @ApiProperty({ example: '사업체사진' })
  CMPNY_IM: string;

  @ApiProperty({ example: '채용제목' })
  TITLE: string;

  @ApiProperty({ example: '모집직종' })
  JOB_TYPE_DESC: string;

  @ApiProperty({ example: '근무예정지 주소' })
  WORK_ADDRESS: string;

  @ApiProperty({ example: '경력' })
  CAREER: string;

  @ApiProperty({ example: '직무내용' })
  JOB_DESC: string;

  @ApiProperty({ example: '접수 시작' })
  STARTRECEPTION: string;

  @ApiProperty({ example: '접수 종료' })
  ENDRECEPTION: string;

  @ApiProperty({ example: '승인심사완료일' })
  APPROVAL_DATE: string;
}

export class SelectJobPublicOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '일자리 목록 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: '10',
    description: '총갯수',
  })
  count: string;

  @ApiProperty({ example: ['일자리 데이터'] })
  data: JobPublicOutputDto;
}

export class GetUserBySearchInputDto {
  @ApiProperty({ example: '' })
  SEARCH_NAME: string;
}
