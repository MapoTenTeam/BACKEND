import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './jobs-status.enum';
import { CreateBoardDto } from './dtos/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { BoardRepository } from './jobs.repository';
// import { Board } from './jobs.entity';
import { User } from 'src/auth/entities/user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class BoardsService {
  // constructor(
  //   @InjectRepository(BoardRepository)
  //   private boardRepository: BoardRepository,
  // ) {}

  async getEnterpriseRegisterJob() {
    const conn = getConnection();
    const educd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'educd'`,
    );
    const career = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'career'`,
    );
    const areacd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'areacd'`,
    );
    const empcd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'empcd'`,
    );
    const empdet = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'empdet'`,
    );
    const paycd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'paycd'`,
    );
    const sevpay = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'sevpay'`,
    );
    const clstyp = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'clstyp'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '기업 채용공고 등록 메뉴 조회 성공',
      data: {
        educd: educd,
        career: career,
        areacd: areacd,
        empcd: empcd,
        empdet: empdet,
        paycd: paycd,
        sevpay: sevpay,
        clstyp: clstyp,
      },
    });
  }

  // async getAllBoards(user: User): Promise<Board[]> {
  async getAllBoards(user: User) {
    // const query = this.boardRepository.createQueryBuilder('board');
    // query.where('board.userId = :userId', { userId: user.id });
    // const boards = await this.boardRepository
    //   .createQueryBuilder('board')
    //   .where('board.userId = :userId', { userId: user.id })
    //   .select(['board.title', 'board.description', 'board.status'])
    //   .getMany();
    // return boards;
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

  // createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
  //   console.log('CreateBoardDto', createBoardDto);
  //   console.log('user', user.id);
  //   return this.boardRepository.createBoard(createBoardDto, user);
  // }

  // async getBoardById(id: number): Promise<Board> {
  //   const found = await this.boardRepository.findOne(id);

  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }

  //   return found;
  // }

  // async deleteBoard(id: number): Promise<void> {
  //   const result = await this.boardRepository.delete(id);

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }

  //   console.log('result', result);
  // }

  // async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
  //   const board = await this.getBoardById(id);

  //   board.status = status;
  //   await this.boardRepository.save(board);

  //   return board;
  // }
}
