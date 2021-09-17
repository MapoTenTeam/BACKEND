import { ApiProperty } from '@nestjs/swagger';

export class EnterpriseRegisterMenuCrprtdvcdDto {
  @ApiProperty({ example: '법인' })
  1: string;
  @ApiProperty({ example: '개인회사' })
  2: string;
  @ApiProperty({ example: '공공기간' })
  3: string;
}

export class EnterpriseRegisterMenuEducdDto {
  @ApiProperty({ example: '고졸' })
  1: string[];
  @ApiProperty({ example: '대졸' })
  2: string[];
  @ApiProperty({ example: '대학원' })
  3: string[];
  @ApiProperty({ example: '관계없음' })
  4: string[];
}

export class EnterpriseRegisterMenuCareerDto {
  @ApiProperty({ example: '신입' })
  1: string[];
  @ApiProperty({ example: '경력' })
  2: string[];
  @ApiProperty({ example: '관계없음' })
  3: string[];
}

export class EnterpriseRegisterMenuAreacdDto {
  @ApiProperty({ example: '사업체본사' })
  1: string[];
  @ApiProperty({ example: '사업체지사' })
  2: string[];
  @ApiProperty({ example: '소재지와 동일' })
  3: string[];
  @ApiProperty({ example: '그밖의 다른 사업체' })
  4: string[];
}

export class EnterpriseRegisterMenuEmpcdDto {
  @ApiProperty({ example: '상용직' })
  1: string[];
  @ApiProperty({ example: '일용직' })
  2: string[];
}

export class EnterpriseRegisterMenuPaycdDto {
  @ApiProperty({ example: '연봉' })
  1: string[];
  @ApiProperty({ example: '월급' })
  2: string[];
  @ApiProperty({ example: '일급' })
  3: string[];
  @ApiProperty({ example: '시급' })
  4: string[];
}

export class EnterpriseRegisterMenuSevpayDto {
  @ApiProperty({ example: '퇴직금' })
  1: string[];
  @ApiProperty({ example: '퇴직연금' })
  2: string[];
  @ApiProperty({ example: '해당사항 없음' })
  3: string[];
}

export class EnterpriseRegisterMenuClstypDto {
  @ApiProperty({ example: '마감일' })
  1: string[];
  @ApiProperty({ example: '채용시까지' })
  2: string[];
}
export class EnterpriseRegisterMenuOutputDto {
  @ApiProperty({ description: '기업구분' })
  crprtdvcd: EnterpriseRegisterMenuCrprtdvcdDto;
  @ApiProperty({ description: '학력' })
  educd: EnterpriseRegisterMenuEducdDto;
  @ApiProperty({ description: '경력' })
  career: EnterpriseRegisterMenuCareerDto;
  @ApiProperty({ description: '근무예정지' })
  areacd: EnterpriseRegisterMenuAreacdDto;
  @ApiProperty({ description: '고용형태' })
  empcd: EnterpriseRegisterMenuEmpcdDto;
  @ApiProperty({ description: '임금지급형태' })
  paycd: EnterpriseRegisterMenuPaycdDto;
  @ApiProperty({ description: '퇴직금' })
  sevpay: EnterpriseRegisterMenuSevpayDto;
  @ApiProperty({ description: '접수마감일' })
  clstyp: EnterpriseRegisterMenuClstypDto;
}

//
export class EnterpriseRegisterMenuDto {
  @ApiProperty({
    example: '200',
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    example: '기업 채용공고 등록 메뉴 조회 성공',
    description: '설명',
  })
  message: string;

  @ApiProperty()
  data: EnterpriseRegisterMenuOutputDto;
}
