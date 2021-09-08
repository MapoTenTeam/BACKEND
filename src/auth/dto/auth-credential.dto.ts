import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ type: String, description: 'user userId' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @ApiProperty({ type: String, description: 'user passWord' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 가능한 유효성 검사
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

  usernickname: string;

  useremail: string;

  usertype: number;

  bizrno: string;
}
