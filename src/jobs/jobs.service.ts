import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { BoardStatus } from './jobs-status.enum';
import { CreateBoardDto } from './dtos/create-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { BoardRepository } from './jobs.repository';
// import { Board } from './jobs.entity';
import { User } from 'src/auth/entities/user.entity';
import { getConnection } from 'typeorm';
import { JobEnterpriseRegisterInputDto } from './dtos/job-enterprise.dto';

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

  async enterpriseRegisterJob(
    @Req() req,
    jobEnterpriseRegisterInputDto: JobEnterpriseRegisterInputDto,
  ) {
    const {
      TITLE,
      JOB_TYPE_DESC,
      REQUIRE_COUNT,
      JOB_DESC,
      DEUCATION,
      CAREER,
      CAREER_PERIOD,
      WORK_AREA,
      WORK_ADDRESS,
      WORK_AREA_DESC,
      EMPLOYTYPE,
      EMPLOYTYPE_DET,
      PAYCD,
      PAY_AMOUNT,
      WORK_TIME_TYPE,
      MEAL_COD,
      WORKINGHOURS,
      SEVERANCE_PAY_TYPE,
      SOCIAL_INSURANCE,
      CLOSING_TYPE,
      ENDRECEPTION,
      APPLY_METHOD,
      APPLY_METHOD_ETC,
      TEST_METHOD,
      TEST_METHOD_DTC,
      APPLY_DOCUMENT,
      CONTACT_NAME,
      CONTACT_DEPARTMENT,
      CONTACT_PHONE,
      CONTACT_EMAIL,
    } = jobEnterpriseRegisterInputDto;

    const conn = getConnection();
    const [found] = await conn.query(
      `SELECT ENTRPRS_MBER_ID FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND BSNNM_APRVL_CODE='30'`,
    );

    if (found) {
      const [job_type] = await conn.query(
        `SELECT ENTRPRS_SE_CODE AS CODE FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
      );
      var JOB_TYPE = '';
      if (job_type.CODE == 10 || job_type.CODE == 20) {
        JOB_TYPE = 'GEN';
      } else if (job_type.CODE == 30) {
        JOB_TYPE = 'PUB';
      } else {
        return Object.assign({
          statusCode: 400,
          message: '기업구분 오류',
        });
      }
      var sql =
        'INSERT INTO jobInformation (ENTRPRS_MBER_ID,TITLE,JOB_TYPE_DESC,REQUIRE_COUNT,JOB_DESC,DEUCATION,CAREER,CAREER_PERIOD,WORK_AREA,WORK_ADDRESS,WORK_AREA_DESC,EMPLOYTYPE,EMPLOYTYPE_DET,PAYCD,PAY_AMOUNT,WORK_TIME_TYPE,MEAL_COD,WORKINGHOURS,SEVERANCE_PAY_TYPE,SOCIAL_INSURANCE,CLOSING_TYPE,ENDRECEPTION,APPLY_METHOD,APPLY_METHOD_ETC,TEST_METHOD,TEST_METHOD_DTC,APPLY_DOCUMENT,CONTACT_NAME,CONTACT_DEPARTMENT,CONTACT_PHONE,CONTACT_EMAIL,JOB_TYPE,CREATE_AT) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())';
      var params = [
        found.ENTRPRS_MBER_ID,
        TITLE,
        JOB_TYPE_DESC,
        REQUIRE_COUNT,
        JOB_DESC,
        DEUCATION,
        CAREER,
        CAREER_PERIOD,
        WORK_AREA,
        WORK_ADDRESS,
        WORK_AREA_DESC,
        EMPLOYTYPE,
        EMPLOYTYPE_DET,
        PAYCD,
        PAY_AMOUNT,
        WORK_TIME_TYPE,
        MEAL_COD,
        WORKINGHOURS,
        SEVERANCE_PAY_TYPE,
        SOCIAL_INSURANCE,
        CLOSING_TYPE,
        ENDRECEPTION,
        APPLY_METHOD,
        APPLY_METHOD_ETC,
        TEST_METHOD,
        TEST_METHOD_DTC,
        APPLY_DOCUMENT,
        CONTACT_NAME,
        CONTACT_DEPARTMENT,
        CONTACT_PHONE,
        CONTACT_EMAIL,
        JOB_TYPE,
      ];
      await conn.query(sql, params);
      return Object.assign({
        statusCode: 201,
        message: '채용공고 등록 성공',
      });
    } else {
      return Object.assign({
        statusCode: 401,
        message: '사업자등록번호 승인 필요',
      });
    }
  }

  async enterpriseJudgeJob(@Req() req, param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND APPROVAL_YN='REG'`,
    );

    if (found) {
      await conn.query(
        `UPDATE jobInformation SET APPROVAL_YN='REQ', REQUEST_DATE=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}'`,
      );
      return Object.assign({
        statusCode: 200,
        message: '채용공고 심사요청 성공',
      });
    } else {
      return Object.assign({
        statusCode: 400,
        message: '채용공고 심사요청 실패',
      });
    }
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
