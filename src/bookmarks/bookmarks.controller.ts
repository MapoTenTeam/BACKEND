import {
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';

@ApiTags('북마크 API')
@Controller('bookmarks')
export class BookmarksController {
  private logger = new Logger('BookmarksController');
  constructor(private bookmarksService: BookmarksService) {}
  //북마크 등록
  @Post('/:jobid')
  @ApiOperation({ summary: '북마크 등록 API(완료)*' })
  @ApiParam({
    name: 'jobid',
    example: '1',
    description: '일자리Id',
  })
  @ApiResponse({
    status: 200,
    description: '북마크 등록 성공',
  })
  @ApiResponse({
    status: 400,
    description: '북마크 등록 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseRegisterJob(@Req() req, @Param() param: { jobid: number }) {
    this.logger.verbose(`북마크 등록
    Payload: ${req.user} ${param}`);
    return await this.bookmarksService.enterpriseRegisterJob(req.user, param);
  }

  //북마크 목록 조회
  @Get()
  @ApiOperation({ summary: '북마크 목록 조회 API(완료)*' })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: '북마크 페이지 넘버',
  })
  @ApiResponse({
    status: 200,
    description: '북마크 조회 성공',
  })
  @ApiResponse({
    status: 400,
    description: '북마크 조회 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseListJob(@Req() req, @Query() query) {
    this.logger.verbose(`북마크 목록 조회
    Payload: ${req.user} ${query}`);
    return await this.bookmarksService.enterpriseListJob(req.user, query);
  }

  //북마크 취소
  @Patch('/:bookid')
  @ApiOperation({ summary: '북마크 취소 API(완료)*' })
  @ApiParam({
    name: 'bookid',
    example: '1',
    description: '북마크Id',
  })
  @ApiResponse({
    status: 200,
    description: '북마크 삭제 성공',
  })
  @ApiResponse({
    status: 400,
    description: '북마크 삭제 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseEditJob(@Req() req, @Param() param: { bookid: number }) {
    this.logger.verbose(`북마크 취소
    Payload: ${req.user} ${param}`);
    return await this.bookmarksService.enterpriseEditJob(req.user, param);
  }
}
