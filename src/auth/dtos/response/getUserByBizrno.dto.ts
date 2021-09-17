import { ApiProperty } from '@nestjs/swagger';

export class GetUserByBizrnoNotDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '사업자등록번호가 없습니다.',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'false',
    description: '중복된 사업자등록번호가 없는경우',
  })
  isDuplicate: boolean;
}

export class GetUserByBizrnoDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '사업자등록번호가 있습니다.',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'true',
    description: '중복된 사업자등록번호가 있는경우',
  })
  isDuplicate: boolean;
}
