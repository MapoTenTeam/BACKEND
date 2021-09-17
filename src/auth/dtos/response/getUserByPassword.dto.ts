import { ApiProperty } from '@nestjs/swagger';

export class GetUserByPasswordFindInputDto {
  @ApiProperty({ example: '아이디' })
  USER_ID: string;
  @ApiProperty({ example: '이메일' })
  USER_EMAIL: string;
}

export class GetUserByPasswordFindOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '임시 비밀번호 생성 성공',
    description: '설명',
  })
  message: string;
}
