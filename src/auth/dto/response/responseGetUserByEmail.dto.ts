import { ApiProperty } from '@nestjs/swagger';

export class responseGetUserByEmailNotDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '유저 이메일이 없습니다.',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'false',
    description: '중복된 이메일이 없는경우',
  })
  isDuplicate: boolean;
}

export class responseGetUserByEmailDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '유저 이메일이 있습니다.',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'true',
    description: '중복된 이메일이 있는경우',
  })
  isDuplicate: boolean;
}
