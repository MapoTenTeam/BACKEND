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

    const apytyp = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'apytyp'`,
    );
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
    const timecd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'timecd'`,
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
    const doccd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'doccd'`,
    );
    const mealcd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'mealcd'`,
    );
    const socins = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'socins'`,
    );
    const testmt = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'testmt'`,
    );

    return Object.assign({
      statusCode: 200,
      message: '기업 채용공고 등록 메뉴 조회 성공',
      data: {
        educd: educd,
        career: career,
        areacd: areacd,
        timecd: timecd,
        empcd: empcd,
        empdet: empdet,
        paycd: paycd,
        sevpay: sevpay,
        clstyp: clstyp,
        apytyp: apytyp,
        doccd: doccd,
        mealcd: mealcd,
        socins: socins,
        testmt: testmt,
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

  async enterpriseEditJob(
    @Req() req,
    param: { jobid: number },
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
      `SELECT JOBID, ENTRPRS_MBER_ID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND JOB_STTUS='Y'`,
    );

    if (found) {
      var sql =
        'UPDATE jobInformation SET TITLE=?,JOB_TYPE_DESC=?,REQUIRE_COUNT=?,JOB_DESC=?,DEUCATION=?,CAREER=?,CAREER_PERIOD=?,WORK_AREA=?,WORK_ADDRESS=?,WORK_AREA_DESC=?,EMPLOYTYPE=?,EMPLOYTYPE_DET=?,PAYCD=?,PAY_AMOUNT=?,WORK_TIME_TYPE=?,MEAL_COD=?,WORKINGHOURS=?,SEVERANCE_PAY_TYPE=?,SOCIAL_INSURANCE=?,CLOSING_TYPE=?,ENDRECEPTION=?,APPLY_METHOD=?,APPLY_METHOD_ETC=?,TEST_METHOD=?,TEST_METHOD_DTC=?,APPLY_DOCUMENT=?,CONTACT_NAME=?,CONTACT_DEPARTMENT=?,CONTACT_PHONE=?,CONTACT_EMAIL=?,UPDATE_AT=NOW() WHERE ENTRPRS_MBER_ID=? AND JOBID=?';
      var params = [
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
        found.ENTRPRS_MBER_ID,
        found.JOBID,
      ];
      await conn.query(sql, params);
      return Object.assign({
        statusCode: 200,
        message: '채용공고 수정 성공',
      });
    } else {
      return Object.assign({
        statusCode: 400,
        message: '채용공고 수정 실패',
      });
    }
  }

  async enterpriseJudgeJob(@Req() req, param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND JOB_STAT='REG' AND JOB_STTUS='Y'`,
    );

    if (found) {
      await conn.query(
        `UPDATE jobInformation SET JOB_STAT='REQ', REQUEST_DATE=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}'`,
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

  async enterpriseListJob(@Req() req) {
    const conn = getConnection();

    const [jobfound] = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y'`,
    );

    const found = await conn.query(
      `SELECT JOBID,TITLE,CREATE_AT,REQUEST_DATE,COMENTS, 
      CASE
      WHEN JOB_STAT = 'REQ'
      THEN '승인요청'
      WHEN JOB_STAT = 'DENI'
      THEN '승인거절'
      WHEN JOB_STAT = 'APPRV'
      THEN '승인완료'
      ELSE '등록' END AS JOB_STAT FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y'`,
    );

    if (jobfound) {
      return Object.assign({
        statusCode: 200,
        message: '채용공고 목록 조회 성공',
        ok: true,
        data: found,
      });
    } else {
      return Object.assign({
        statusCode: 200,
        message: '채용공고 등록 필요',
        ok: false,
      });
    }
  }

  async enterpriseListDetailJob(@Req() req, param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT * FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND JOB_STTUS='Y'`,
    );

    if (found) {
      const [user] = await conn.query(
        `SELECT * FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
      );
      const [educd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='educd' AND CODE='${found.DEUCATION}'`,
      );
      const [career] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='career' AND CODE='${found.CAREER}'`,
      );
      const [areacd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='areacd' AND CODE='${found.WORK_AREA}'`,
      );
      const [timecd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='timecd' AND CODE='${found.WORK_TIME_TYPE}'`,
      );
      const [empcd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empcd' AND CODE='${found.EMPLOYTYPE}'`,
      );
      const [empdet] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empdet' AND CODE='${found.EMPLOYTYPE_DET}'`,
      );
      const [paycd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='paycd' AND CODE='${found.PAYCD}'`,
      );
      const [sevpay] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='sevpay' AND CODE='${found.SEVERANCE_PAY_TYPE}'`,
      );
      const [clstyp] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='clstyp' AND CODE='${found.CLOSING_TYPE}'`,
      );
      const [apytyp] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='apytyp' AND CODE='${found.APPLY_METHOD}'`,
      );
      const [doccd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='doccd' AND CODE='${found.APPLY_DOCUMENT}'`,
      );
      const [mealcd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='mealcd' AND CODE='${found.MEAL_COD}'`,
      );
      const [socins] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='socins' AND CODE='${found.SOCIAL_INSURANCE}'`,
      );
      const [testmt] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='testmt' AND CODE='${found.TEST_METHOD}'`,
      );
      return Object.assign({
        statusCode: 200,
        message: '채용공고 상세 조회 성공',
        data: {
          JOBID: found.JOBID,

          CMPNY_NM: user.CMPNY_NM,
          BIZRNO: user.BIZRNO,
          CEO: user.CEO,
          ADRES: user.ADRES,
          DETAIL_ADRES: user.DETAIL_ADRES,
          INDUTY: user.INDUTY,
          NMBR_WRKRS: user.NMBR_WRKRS,

          TITLE: found.TITLE,
          JOB_TYPE_DESC: found.JOB_TYPE_DESC,
          REQUIRE_COUNT: found.REQUIRE_COUNT,
          JOB_DESC: found.JOB_DESC,
          DEUCATION: educd.CODE_NM,
          CAREER: career.CODE_NM,
          WORK_AREA: areacd.CODE_NM,
          EMPLOYTYPE: empcd.CODE_NM,
          EMPLOYTYPE_DET: empdet.CODE_NM,
          PAYCD: paycd.CODE_NM,
          WORK_TIME_TYPE: timecd.CODE_NM,
          STARTRECEPTION: found.STARTRECEPTION,
          ENDRECEPTION: found.ENDRECEPTION,
          CAREER_PERIOD: found.CAREER_PERIOD,
          WORK_ADDRESS: found.WORK_ADDRESS,
          WORK_AREA_DESC: found.WORK_AREA_DESC,
          PAY_AMOUNT: found.PAY_AMOUNT,
          MEAL_COD: mealcd.CODE_NM,
          WORKINGHOURS: found.WORKINGHOURS,
          SEVERANCE_PAY_TYPE: sevpay.CODE_NM,
          SOCIAL_INSURANCE: socins.CODE_NM,
          CLOSING_TYPE: clstyp.CODE_NM,
          APPLY_METHOD: apytyp.CODE_NM,
          APPLY_METHOD_ETC: found.APPLY_METHOD_ETC,
          TEST_METHOD: testmt.CODE_NM,
          TEST_METHOD_DTC: found.TEST_METHOD_DTC,
          APPLY_DOCUMENT: doccd.CODE_NM,
          CONTACT_NAME: found.CONTACT_NAME,
          CONTACT_DEPARTMENT: found.CONTACT_DEPARTMENT,
          CONTACT_PHONE: found.CONTACT_PHONE,
          CONTACT_EMAIL: found.CONTACT_EMAIL,
        },
      });
    } else {
      return Object.assign({
        statusCode: 400,
        message: '채용공고 상세 조회 실패',
      });
    }
  }

  async enterpriseDeleteJob(@Req() req, param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND JOB_STTUS='Y'`,
    );

    if (found) {
      await conn.query(
        `UPDATE jobInformation SET JOB_STTUS='N', DELEETE_AT=NOW() WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}'`,
      );
      return Object.assign({
        statusCode: 200,
        message: '채용공고 삭제 성공',
      });
    } else {
      return Object.assign({
        statusCode: 400,
        message: '채용공고 삭제 실패',
      });
    }
  }
}
