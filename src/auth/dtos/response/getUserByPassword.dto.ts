import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserByPasswordFindInputDto {
  @ApiProperty({ example: '아이디' })
  @IsString()
  @IsNotEmpty()
  USER_ID: string;

  @ApiProperty({ example: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  USER_EMAIL: string;
}

export class GetUserByPasswordFindOutputDto {
  @ApiProperty({
    example: '201',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '임시 비밀번호 생성 성공',
    description: '설명',
  })
  message: string;
}
