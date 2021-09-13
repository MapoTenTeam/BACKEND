import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetUserByDeleteOutputDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '회원 탈퇴 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty({
    example: true,
    description: '회원 삭제 여부',  
  })
  ok: boolean;
}
