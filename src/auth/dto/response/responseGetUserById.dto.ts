import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetUserByIdNotDto {
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

export class ResponseGetUserByIdDto {
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

export class ResponseGetUserByIdFindInputDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  email: string;
}

export class ResponseGetUserByIdFindOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '유저 아이디 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: 'hee1234',
    description: '유저 아이디',
  })
  userId: string;
}
