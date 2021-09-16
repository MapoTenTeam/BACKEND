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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { BoardStatus } from './jobs-status.enum';
import { Board } from './jobs.entity';
import { BoardsService } from './jobs.service';
import { CreateBoardDto } from './dto/create-job.dto';
import { BoardStatusValidationPipe } from './pipes/jobs-status-validation.pipe';

@ApiTags('일자리 API')
@Controller('job')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //공공 일자리 목록 조회
  @Get('/public')
  @ApiOperation({ summary: '공공 일자리 목록 조회 API' })
  async getPublicJob() {}

  //공공 일자리 상세 조회
  @Get('/public/detail/:id')
  @ApiOperation({ summary: '공공 일자리 상세 조회 API' })
  async getPublicDetailJob() {}

  //일반 일자리 목록 조회
  @Get('/general')
  @ApiOperation({ summary: '일반 일자리 목록 조회 API' })
  async getGeneralJob() {}

  //일반 일자리 상세 조회
  @Get('/general/detail/:id')
  @ApiOperation({ summary: '일반 일자리 상세 조회 API' })
  async getGeneralDetailJob() {}

  //기업 채용공고 등록
  @Post('/enterprise/register')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 등록 API' })
  async enterpriseRegisterJob() {}

  //기업 채용공고 목록 조회
  @Get('/enterprise/list')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 목록 조회 API' })
  async enterpriseListJob() {}

  //기업 채용공고 상세 조회
  @Get('/enterprise/list/detail/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 상세 조회 API' })
  async enterpriseListDetailJob() {}

  //기업 채용공고 수정
  @Put('/enterprise/edit/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 수정 API' })
  async enterpriseEditJob() {}

  //기업 채용공고 삭제
  @Delete('/enterprise/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기업 채용공고 삭제 API' })
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
