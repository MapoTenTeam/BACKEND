import { ApiProperty } from '@nestjs/swagger';

export class UpdateBizrnoApprovalInputDto {
  @ApiProperty({ example: '1' })
  JOBID: number;

  @ApiProperty({ example: '좋아요' })
  COMMENT: string;
}
