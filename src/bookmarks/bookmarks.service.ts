import { Injectable, Logger, Req } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class BookmarksService {
  private logger = new Logger('BookmarksService');
  async enterpriseRegisterJob(@Req() req, param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT BOOKID FROM bookmark WHERE MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND BOOKMARK='Y'`,
    );

    if (!found) {
      await conn.query(
        `INSERT INTO bookmark(MBER_ID, JOBID, CREATE_AT) 
              VAlUE('${req.USER_ID}', '${param.jobid}', NOW());`,
      );
      this.logger.log(`북마크 등록 성공
      User Id: ${req.USER_ID}
      Job Id: ${param.jobid}`);
      return Object.assign({
        statusCode: 201,
        message: '북마크 등록 성공',
      });
    } else {
      this.logger.warn(`북마크 등록 실패
      User Id: ${req.USER_ID}
      Job Id: ${param.jobid}`);
      return Object.assign({
        statusCode: 400,
        message: '북마크 등록 실패',
      });
    }
  }

  async enterpriseListJob(@Req() req, query) {
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT BOOKID FROM bookmark WHERE MBER_ID='${req.USER_ID}' AND BOOKMARK='Y'`,
    );

    if (found) {
      const bookmark = await conn.query(
        `SELECT  A.BOOKID, A.JOBID, C.CMPNY_NM, 
        IFNULL(B.JOB_IM, '') AS JOB_IM, B.TITLE, B.JOB_TYPE_DESC, 
        IFNULL(B.WORK_ADDRESS, '') AS WORK_ADDRESS, D.CODE_NM AS CAREER , B.JOB_DESC, B.STARTRECEPTION, B.ENDRECEPTION
        FROM bookmark A 
        INNER JOIN jobInformation B ON (A.JOBID = B.JOBID) 
        INNER JOIN COMTNENTRPRSMBER C ON (B.ENTRPRS_MBER_ID = C.ENTRPRS_MBER_ID) 
        INNER JOIN COMTCCMMNDETAILCODE D ON (B.CAREER = D.CODE)
        WHERE MBER_ID='${req.USER_ID}' AND BOOKMARK='Y' AND CODE_ID='career' AND USE_AT ='Y'
        ORDER BY A.CREATE_AT DESC LIMIT 12 OFFSET ${pagecount}`,
      );

      const [count] = await conn.query(
        `SELECT COUNT(BOOKID) AS COUNT FROM bookmark WHERE MBER_ID='${req.USER_ID}' AND BOOKMARK='Y'`,
      );

      if (bookmark != 0) {
        this.logger.log(`북마크 조회 성공
        User Id: ${req.USER_ID}`);
        return Object.assign({
          statusCode: 200,
          message: '북마크 조회 성공',
          count: count.COUNT,
          data: bookmark,
        });
      } else {
        this.logger.warn(`북마크 조회 실패
        User Id: ${req.USER_ID}`);
        return Object.assign({
          statusCode: 400,
          message: '북마크 조회 실패',
        });
      }
    } else {
      this.logger.warn(`북마크 조회 실패
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 400,
        message: '북마크 조회 실패',
      });
    }
  }

  async enterpriseEditJob(@Req() req, param: { bookid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT BOOKID FROM bookmark WHERE MBER_ID='${req.USER_ID}' AND BOOKID='${param.bookid}' AND BOOKMARK='Y'`,
    );

    if (found) {
      const update = await conn.query(
        `UPDATE bookmark SET BOOKMARK='N', UPDATE_AT=NOW() WHERE MBER_ID='${req.USER_ID}' AND BOOKID='${param.bookid}' AND BOOKMARK='Y'`,
      );
      this.logger.log(`북마크 삭제 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 200,
        message: '북마크 삭제 성공',
      });
    } else {
      this.logger.warn(`북마크 삭제 실패
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 400,
        message: '북마크 삭제 실패',
      });
    }
  }
}
