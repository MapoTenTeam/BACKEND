import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('북마크 API')
@Controller('bookmarks')
export class BookmarksController {
  //북마크 등록
  @Post('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '북마크 등록 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  async enterpriseRegisterJob() {}

  //북마크 목록 조회
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '북마크 목록 조회 API' })
  async enterpriseListJob() {}

  //북마크 수정
  @Patch('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '북마크 수정 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  async enterpriseEditJob() {}

  //북마크 삭제
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '북마크 삭제 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  async enterpriseDeleteJob() {}
}
