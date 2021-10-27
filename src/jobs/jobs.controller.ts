import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardsService } from './jobs.service';
import { EnterpriseRegisterMenuDto } from './dtos/enterpriseRegisterMenu.dto';
import {
  DeleteJobEnterpriseOutputDto,
  JobEnterpriseJudgeOutputDto,
  JobEnterpriseRegisterInputDto,
  JobEnterpriseRegisterOutputDto,
  SelectJobDetailOutputDto,
  SelectJobEnterpriseDetailOutputDto,
  SelectJobEnterpriseOutputDto,
  SelectJobEnterpriseOutputNotDto,
  UpdateJobEnterpriseOutputDto,
} from './dtos/job-enterprise.dto';
import {
  GetUserBySearchInputDto,
  SelectJobPublicOutputDto,
} from './dtos/job-public.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/auth/multerOptions';

@ApiTags('일자리 API')
@Controller('job')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //공공 일자리 목록 조회
  @Post('/public')
  @ApiOperation({
    summary: '공공 일자리 목록 조회(검색-12개) API(완료)*',
  })
  @ApiBody({
    description: '검색 정보(없으면 공백값)',
    type: GetUserBySearchInputDto,
  })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: '공공 일자리 페이지 넘버',
  })
  @ApiOkResponse({
    description: '페이지별 12개씩 공공일자리 목록',
    type: SelectJobPublicOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '공공일자리 목록 조회 실패',
  })
  async getPublicJob(
    @Body()
    getUserBySearchInputDto: GetUserBySearchInputDto,
    @Query() query,
  ) {
    return await this.boardsService.getPublicJob(
      getUserBySearchInputDto,
      query,
    );
  }

  //일반 일자리 목록 조회
  @Post('/general')
  @ApiOperation({
    summary: '일반 일자리 목록 조회(검색-12개) API(완료)*',
  })
  @ApiBody({
    description: '검색 정보(없으면 공백값)',
    type: GetUserBySearchInputDto,
  })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: '일반 일자리 페이지 넘버',
  })
  @ApiOkResponse({
    description: '페이지별 12개씩 일반일자리 목록',
    type: SelectJobPublicOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '일반일자리 목록 조회 실패',
  })
  async getGeneralJob(
    @Body()
    getUserBySearchInputDto: GetUserBySearchInputDto,
    @Query() query,
  ) {
    return await this.boardsService.getGeneralJob(
      getUserBySearchInputDto,
      query,
    );
  }

  //일자리 상세 조회
  @Get('/detail/:jobid')
  @ApiOperation({ summary: '일자리 상세 조회(일반,공공) API(완료)*' })
  @ApiParam({
    name: 'jobid',
    example: '1',
    description: '일자리Id',
  })
  @ApiResponse({
    status: 404,
    description: '코드값이 아닌경우',
  })
  @ApiOkResponse({
    description: '일자리 상세 페이지',
    type: SelectJobDetailOutputDto,
  })
  async getDetailJob(@Param() param: { jobid: number }) {
    return await this.boardsService.getDetailJob(param);
  }

  //기업 채용공고 등록 메뉴 조회
  @Get('/enterprise/register/all')
  @ApiOperation({
    summary: '기업 채용공고 등록 메뉴 조회 API(완료)*',
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
  @ApiOperation({ summary: '기업 채용공고 등록 API(완료)*' })
  @ApiConsumes('multipart/form-data')
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
    description: '지원하지 않는 이미지 형식',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiResponse({
    status: 402,
    description: '사업자등록번호 승인 필요',
  })
  @ApiResponse({
    status: 404,
    description: '기업구분 오류',
  })
  @ApiResponse({
    status: 413,
    description: '파일크기 제한',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async enterpriseRegisterJob(
    @Req() req,
    @UploadedFiles() files: string,
    @Body(ValidationPipe)
    jobEnterpriseRegisterInputDto: JobEnterpriseRegisterInputDto,
  ) {
    return await this.boardsService.enterpriseRegisterJob(
      req.user,
      jobEnterpriseRegisterInputDto,
      files,
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
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseJudgeJob(@Req() req, @Param() param: { jobid: number }) {
    return await this.boardsService.enterpriseJudgeJob(req.user, param);
  }

  //기업 채용공고 목록 조회
  @Get('/enterprise/list')
  @ApiOperation({ summary: '기업 채용공고 목록 조회 API(완료)*' })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: '채용공고 페이지 넘버',
  })
  @ApiOkResponse({
    description: '채용공고 목록 조회',
    type: SelectJobEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 201,
    description: '채용공고 목록 조회(등록된 데이터 없을때)',
    type: SelectJobEnterpriseOutputNotDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseListJob(@Req() req, @Query() query) {
    return await this.boardsService.enterpriseListJob(req.user, query);
  }

  //기업 채용공고 상세 조회
  @Get('/enterprise/list/detail/:jobid')
  @ApiOperation({ summary: '기업 채용공고 상세 조회 API(완료)*' })
  @ApiParam({
    name: 'jobid',
    example: '1',
    description: '채용공고 아이디',
  })
  @ApiOkResponse({
    description: '채용공고 상세 조회',
    type: SelectJobEnterpriseDetailOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '채용공고 상세 조회 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiResponse({
    status: 404,
    description: '코드값이 아닌경우',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseListDetailJob(@Req() req, @Param() param: { jobid: number }) {
    return await this.boardsService.enterpriseListDetailJob(req.user, param);
  }

  //기업 채용공고 수정
  @Put('/enterprise/edit/:jobid')
  @ApiOperation({ summary: '기업 채용공고 수정 API(완료)*' })
  @ApiParam({
    name: 'jobid',
    example: '1',
    description: '일자리Id',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '채용공고 수정',
    type: JobEnterpriseRegisterInputDto,
  })
  @ApiOkResponse({
    description: '채용공고 수정',
    type: UpdateJobEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '지원하지 않는 이미지 형식',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiResponse({
    status: 402,
    description: '사업자등록번호 승인 필요',
  })
  @ApiResponse({
    status: 404,
    description: '기업구분 오류',
  })
  @ApiResponse({
    status: 413,
    description: '파일크기 제한',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async enterpriseEditJob(
    @Req() req,
    @UploadedFiles() files: string,
    @Param() param: { jobid: number },
    @Body(ValidationPipe)
    jobEnterpriseRegisterInputDto: JobEnterpriseRegisterInputDto,
  ) {
    return await this.boardsService.enterpriseEditJob(
      req.user,
      param,
      jobEnterpriseRegisterInputDto,
      files,
    );
  }

  //기업 채용공고 삭제
  @Delete('/enterprise/delete/:jobid')
  @ApiOperation({ summary: '기업 채용공고 삭제 API(완료)*' })
  @ApiParam({
    name: 'jobid',
    example: '1',
    description: '일자리Id',
  })
  @ApiOkResponse({
    description: '채용공고 삭제',
    type: DeleteJobEnterpriseOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: '채용공고 삭제 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 오류',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async enterpriseDeleteJob(@Req() req, @Param() param: { jobid: number }) {
    return await this.boardsService.enterpriseDeleteJob(req.user, param);
  }
}
