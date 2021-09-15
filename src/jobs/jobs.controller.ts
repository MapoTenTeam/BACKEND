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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @Get()
  @UseGuards(AuthGuard())
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    // console.log('CreateBoardDto', CreateBoardDto);
    // console.log('user', user);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Put('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
