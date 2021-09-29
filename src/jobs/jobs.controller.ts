import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { BoardStatus } from './jobs-status.enum';
// import { Board } from './jobs.entity';
import { BoardsService } from './jobs.service';
import { CreateBoardDto } from './dtos/create-job.dto';
import { BoardStatusValidationPipe } from './pipes/jobs-status-validation.pipe';
import { EnterpriseRegisterMenuDto } from './dtos/enterpriseRegisterMenu.dto';
import { SelectJobPublicOutputDto } from './dtos/job-public.dto';
import { SelectJobGeneralOutputDto } from './dtos/job-general.dto';
import {
  DeleteJobEnterpriseOutputDto,
  JobEnterpriseJudgeOutputDto,
  JobEnterpriseRegisterInputDto,
  JobEnterpriseRegisterOutputDto,
  SelectJobDetailOutputDto,
  SelectJobEnterpriseDetailOutputDto,
  SelectJobEnterpriseOutputDto,
  UpdateJobEnterpriseOutputDto,
} from './dtos/job-enterprise.dto';

@ApiTags('일자리 API')
@Controller('job')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //공공 일자리 목록 조회
  @Get('/public')
  @ApiOperation({ summary: '공공 일자리 목록 조회 API (페이지당 12개씩)' })
  @ApiQuery({
    name: 'page',
    example: 'http://localhost:3000/job/public?page=1',
    description: '공공 일자리 목록',
  })
  @ApiOkResponse({
    description: '페이지별 12개씩 공공일자리 목록',
    type: SelectJobPublicOutputDto,
  })
  async getPublicJob() {}

  //공공 일자리 상세 조회
  @Get('/public/detail/:id')
  @ApiOperation({ summary: '공공 일자리 상세 조회 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  @ApiOkResponse({
    description: '일자리 상세 페이지',
    type: SelectJobDetailOutputDto,
  })
  async getPublicDetailJob() {}

  //일반 일자리 목록 조회
  @Get('/general')
  @ApiOperation({ summary: '일반 일자리 목록 조회 API (페이지당 12개씩)' })
  @ApiQuery({
    name: 'page',
    example: 'http://localhost:3000/job/general?page=1',
    description: '일반 일자리 목록',
  })
  @ApiOkResponse({
    description: '페이지별 12개씩 일반일자리 목록',
    type: SelectJobGeneralOutputDto,
  })
  async getGeneralJob() {}

  //일반 일자리 상세 조회
  @Get('/general/detail/:id')
  @ApiOperation({ summary: '일반 일자리 상세 조회 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  @ApiOkResponse({
    description: '일자리 상세 페이지',
    type: SelectJobDetailOutputDto,
  })
  async getGeneralDetailJob() {}

  //기업 채용공고 등록 메뉴 조회
  @Get('/enterprise/register/all')
  @ApiOperation({
    summary: '기업 채용공고 등록 메뉴 조회 API (ex 학력,경력)(완료)*',
  })
  @ApiOkResponse({
    type: EnterpriseRegisterMenuDto,
    description: '채용공고 등록 메뉴',
  })
  async getEnterpriseRegisterJob() {
    return await this.boardsService.getEnterpriseRegisterJob();
  }

  //기업 채용공고 등록
  @Post('/enterprise/register')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 등록 API(완료)*' })
  @ApiBody({
    description: '채용공고 등록',
    type: JobEnterpriseRegisterInputDto,
  })
  @ApiResponse({
    status: 201,
    description: '채용공고 등록 성공',
    type: JobEnterpriseRegisterOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '기업구분 오류',
  })
  @ApiResponse({
    status: 401,
    description: '사업자등록번호 승인 필요',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseRegisterJob(
    @Req() req,
    @Body(ValidationPipe)
    jobEnterpriseRegisterInputDto: JobEnterpriseRegisterInputDto,
  ) {
    return await this.boardsService.enterpriseRegisterJob(
      req.user,
      jobEnterpriseRegisterInputDto,
    );
  }

  //기업 채용공고 심사요청
  @Patch('/enterprise/judge/:jobid')
  @ApiOperation({ summary: '기업 채용공고 심사요청 API(완료)*' })
  @ApiParam({
    name: 'jobid',
    example: '1',
    description: '채용공고 심사요청 아이디',
  })
  @ApiOkResponse({
    description: '채용공고 심사요청 성공',
    type: JobEnterpriseJudgeOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '채용공고 심사요청 실패',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseJudgeJob(@Req() req, @Param() param: { jobid: number }) {
    return await this.boardsService.enterpriseJudgeJob(req.user, param);
  }

  //기업 채용공고 목록 조회
  @Get('/enterprise/list')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 목록 조회 API' })
  @ApiOkResponse({
    description: '채용공고 목록 조회',
    type: SelectJobEnterpriseOutputDto,
  })
  async enterpriseListJob() {}

  //기업 채용공고 상세 조회
  @Get('/enterprise/list/detail/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 상세 조회 API' })
  @ApiOkResponse({
    description: '채용공고 상세 조회',
    type: SelectJobEnterpriseDetailOutputDto,
  })
  async enterpriseListDetailJob() {}

  //기업 채용공고 수정
  @Put('/enterprise/edit/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 수정 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  @ApiBody({
    description: '채용공고 수정',
    type: JobEnterpriseRegisterInputDto,
  })
  @ApiOkResponse({
    description: '채용공고 수정',
    type: UpdateJobEnterpriseOutputDto,
  })
  async enterpriseEditJob() {}

  //기업 채용공고 삭제
  @Delete('/enterprise/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 삭제 API' })
  @ApiParam({
    name: 'jobId',
    example: '1',
    description: '일자리Id',
  })
  @ApiOkResponse({
    description: '채용공고 삭제',
    type: DeleteJobEnterpriseOutputDto,
  })
  async enterpriseDeleteJob() {}

  // @Get()
  // @UseGuards(AuthGuard())
  // getAllBoard(@GetUser() user: User): Promise<Board[]> {
  //   return this.boardsService.getAllBoards(user);
  // }

  // @Post()
  // @UseGuards(AuthGuard())
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   @Body() createBoardDto: CreateBoardDto,
  //   @GetUser() user: User,
  // ): Promise<Board> {
  //   // console.log('CreateBoardDto', CreateBoardDto);
  //   // console.log('user', user);
  //   return this.boardsService.createBoard(createBoardDto, user);
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: number): Promise<Board> {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
  //   return this.boardsService.deleteBoard(id);
  // }

  // @Put('/:id/status')
  // updateBoardStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
