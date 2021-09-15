import { ApiProperty } from '@nestjs/swagger';

export class GetUserByEmailNotDto {
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

export class GetUserByEmailDto {
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

export class GetUserByEmailAuthDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '이메일 인증 번호',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: '026456',
    description: '인증 번호',
  })
  authNumber: number;
}
