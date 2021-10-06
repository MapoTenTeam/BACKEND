import { Injectable, Req } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class BookmarksService {
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
      return Object.assign({
        statusCode: 201,
        message: '북마크 등록 성공',
      });
    } else {
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
        `SELECT  A.BOOKID, A.JOBID, C.CMPNY_NM, B.JOB_IM, B.TITLE, B.JOB_TYPE_DESC, B.WORK_ADDRESS, D.CODE_NM AS CAREER , B.JOB_DESC, B.STARTRECEPTION, B.ENDRECEPTION
        FROM bookmark A 
        INNER JOIN jobInformation B ON (A.JOBID = B.JOBID) 
        INNER JOIN COMTNENTRPRSMBER C ON (B.ENTRPRS_MBER_ID = C.ENTRPRS_MBER_ID) 
        INNER JOIN COMTCCMMNDETAILCODE D ON (B.CAREER = D.CODE)
        WHERE MBER_ID='${req.USER_ID}' AND BOOKMARK='Y' AND CODE_ID='career'
        ORDER BY A.CREATE_AT DESC LIMIT 12 OFFSET ${pagecount}`,
      );

      const [count] = await conn.query(
        `SELECT COUNT(BOOKID) AS COUNT FROM bookmark WHERE MBER_ID='${req.USER_ID}' AND BOOKMARK='Y'`,
      );
      return Object.assign({
        statusCode: 200,
        message: '북마크 조회 성공',
        count: count.COUNT,
        data: bookmark,
      });
    } else {
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
      return Object.assign({
        statusCode: 200,
        message: '북마크 삭제 성공',
      });
    } else {
      return Object.assign({
        statusCode: 400,
        message: '북마크 삭제 실패',
      });
    }
  }
}
