import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UpdateBizrnoApprovalInputDto } from './dtos/bizrno-approval.dto';

@Injectable()
export class ManagerService {
  async getBizrnoApproval(@Req() req, query) {
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT EMPLYR_ID FROM COMTNEMPLYRINFO WHERE EMPLYR_STTUS_CODE='P' AND EMPLYR_ID='${req.USER_ID}'`,
    );

    if (user) {
      const [found] = await conn.query(
        `SELECT ENTRPRS_MBER_ID FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_STTUS='P' AND BSNNM_APRVL_CODE='20'`,
      );
      const page = await conn.query(
        `SELECT * FROM COMTNENTRPRSMBER
              WHERE ENTRPRS_MBER_STTUS='P' AND BSNNM_APRVL_CODE='20'
              ORDER BY APPROVAL_DATE DESC LIMIT 12 OFFSET ${pagecount}`,
      );
      const [count] = await conn.query(
        `SELECT COUNT(ENTRPRS_MBER_ID) AS COUNT FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_STTUS='P' AND BSNNM_APRVL_CODE='20'`,
      );
      return found
        ? Object.assign({
            statusCode: 200,
            message: '사업자 승인 신청자 목록 조회 성공',
            ok: true,
            count: count.COUNT,
            data: page,
          })
        : Object.assign({
            statusCode: 200,
            message: '사업자 승인 신청자가 없습니다.',
            ok: false,
          });
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateBizrnoApproval(@Req() req, param: { userid: string }) {
    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT EMPLYR_ID FROM COMTNEMPLYRINFO WHERE EMPLYR_STTUS_CODE='P' AND EMPLYR_ID='${req.USER_ID}'`,
    );

    if (user) {
      await conn.query(
        `UPDATE COMTNENTRPRSMBER SET BSNNM_APRVL_CODE='30', APPROVAL_DATE=NOW(), APPROVAL_USER='${req.USER_ID}' WHERE ENTRPRS_MBER_ID='${param.userid}'`,
      );

      return Object.assign({
        statusCode: 200,
        message: '사업자 승인 성공',
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async getJobApproval(@Req() req, query) {
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT EMPLYR_ID FROM COMTNEMPLYRINFO WHERE EMPLYR_STTUS_CODE='P' AND EMPLYR_ID='${req.USER_ID}'`,
    );

    if (user) {
      const [found] = await conn.query(
        `SELECT JOBID FROM jobInformation WHERE JOB_STTUS='Y' AND JOB_STAT='REQ'`,
      );
      const page = await conn.query(
        `SELECT * FROM jobInformation 
        WHERE JOB_STTUS='Y' AND JOB_STAT='REQ'
        ORDER BY APPROVAL_DATE DESC LIMIT 12 OFFSET ${pagecount}`,
      );
      const [count] = await conn.query(
        `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE JOB_STTUS='Y' AND JOB_STAT='REQ'`,
      );
      return found
        ? Object.assign({
            statusCode: 200,
            message: '채용공고 승인 신청자 목록 조회 성공',
            ok: true,
            count: count.COUNT,
            data: page,
          })
        : Object.assign({
            statusCode: 200,
            message: '채용공고 승인 신청자가 없습니다.',
            ok: false,
          });
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateJobApproval(
    @Req() req,
    updateBizrnoApprovalInputDto: UpdateBizrnoApprovalInputDto,
  ) {
    const { JOBID, COMMENT } = updateBizrnoApprovalInputDto;
    const conn = getConnection();
    const [user] = await conn.query(
      `SELECT EMPLYR_ID FROM COMTNEMPLYRINFO WHERE EMPLYR_STTUS_CODE='P' AND EMPLYR_ID='${req.USER_ID}'`,
    );

    if (user) {
      await conn.query(
        `UPDATE jobInformation SET APPROVAL_YN='Y', APPROVAL_DATE=NOW(), APPROVAL_USER='${req.USER_ID}', JOB_STAT='APPRV', COMENTS='${COMMENT}' 
        WHERE JOBID='${JOBID}'`,
      );

      return Object.assign({
        statusCode: 200,
        message: '사업자 승인 성공',
      });
    } else {
      throw new UnauthorizedException();
    }
  }
}
