import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobPublicOutputDto {
  @ApiProperty({ example: '일자리정보ID' })
  id: number;

  @ApiProperty({ example: '채용제목' })
  title: string;

  @ApiProperty({ example: '사업체이름' })
  name: string;

  @ApiProperty({ example: '사업체주소' })
  address: string;

  @ApiProperty({ example: '접수 시작' })
  start_reception: string;

  @ApiProperty({ example: '접수 종료' })
  end_reception: string;

  @ApiProperty({ example: '사업체사진' })
  image: string;

  @ApiProperty({ example: '공공일자리 갯수' })
  count: number;
}

export class SelectJobPublicOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '공공일자리 목록 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty()
  data: JobPublicOutputDto;
}
