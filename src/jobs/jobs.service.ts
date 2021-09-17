import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './jobs-status.enum';
import { CreateBoardDto } from './dtos/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './jobs.repository';
import { Board } from './jobs.entity';
import { User } from 'src/auth/entities/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    // const query = this.boardRepository.createQueryBuilder('board');
    // query.where('board.userId = :userId', { userId: user.id });

    const boards = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.userId = :userId', { userId: user.id })
      .select(['board.title', 'board.description', 'board.status'])
      .getMany();

    return boards;
    // const conn = getConnection();
    // try {
    //   const rows = await conn.query(
    //     `SELECT USER_ID FROM COMVNUSERMASTER WHERE ESNTL_ID='USRCNFRM_00000000000'`,
    //   );

    //   return Object.assign({
    //     statusCode: 201,
    //     message: '유저 아이디 찾기 성공',
    //     USER_ID: rows[0].USER_ID,
    //   });
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    console.log('CreateBoardDto', createBoardDto);
    console.log('user', user.id);
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
