import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetUserByIdDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '유저 아이디가 없습니다.',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'false',
    description: '중복된 아이디가 없는경우',
  })
  isDuplicate: boolean;
}

export class ResponseGetUserByIdNotDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '유저 아이디가 있습니다.',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'true',
    description: '중복된 아이디가 있는경우',
  })
  isDuplicate: boolean;
}
