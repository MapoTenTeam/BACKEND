import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetUserByPasswordFindInputDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  email: string;
}

export class ResponseGetUserByPasswordFindOutputDto {
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
