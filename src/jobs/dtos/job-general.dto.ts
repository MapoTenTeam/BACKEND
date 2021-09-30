import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobGeneralOutputDto {
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

  @ApiProperty({ example: '일반일자리 갯수' })
  count: number;
}

export class SelectJobGeneralOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '일반일자리 목록 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: '10',
    description: '총갯수',
  })
  count: string;

  @ApiProperty()
  data: JobGeneralOutputDto;
}
