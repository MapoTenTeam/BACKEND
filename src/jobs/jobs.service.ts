import { Injectable, Req } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { JobEnterpriseRegisterInputDto } from './dtos/job-enterprise.dto';
import { GetUserBySearchInputDto } from './dtos/job-public.dto';

@Injectable()
export class BoardsService {
  async getPublicJob(getUserBySearchInputDto: GetUserBySearchInputDto, query) {
    const { SEARCH_NAME } = getUserBySearchInputDto;
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();
    const found = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE JOB_TYPE='PUB' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    const page = await conn.query(
      `SELECT  B.JOBID, A.CMPNY_NM, A.CMPNY_IM, B.TITLE, B.JOB_TYPE_DESC, B.WORK_ADDRESS, B.CAREER, B.JOB_DESC, B.STARTRECEPTION, B.ENDRECEPTION, B.APPROVAL_DATE
      FROM    COMTNENTRPRSMBER A INNER JOIN jobInformation  B  ON (A.ENTRPRS_MBER_ID = B.ENTRPRS_MBER_ID)
      WHERE JOB_TYPE='PUB' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'
      AND TITLE LIKE '%${SEARCH_NAME}%' ORDER BY APPROVAL_DATE DESC LIMIT 12 OFFSET ${pagecount}`,
    );
    const [count] = await conn.query(
      `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE TITLE LIKE '%${SEARCH_NAME}%' AND JOB_TYPE='PUB' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    return found
      ? Object.assign({
          statusCode: 200,
          message: '공공일자리 목록 조회 성공',
          count: count.COUNT,
          data: page,
        })
      : Object.assign({
          statusCode: 400,
          message: '공공일자리 목록 조회 실패',
        });
  }

  async getGeneralJob(getUserBySearchInputDto: GetUserBySearchInputDto, query) {
    const { SEARCH_NAME } = getUserBySearchInputDto;
    var pagecount = (query.page - 1) * 12;
    console.log(SEARCH_NAME);
    const conn = getConnection();
    const found = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE JOB_TYPE='GEN' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    const page = await conn.query(
      `SELECT  B.JOBID, A.CMPNY_NM, A.CMPNY_IM, B.TITLE, B.JOB_TYPE_DESC, B.WORK_ADDRESS, B.CAREER, B.JOB_DESC, B.STARTRECEPTION, B.ENDRECEPTION, B.APPROVAL_DATE
      FROM    COMTNENTRPRSMBER A INNER JOIN jobInformation  B  ON (A.ENTRPRS_MBER_ID = B.ENTRPRS_MBER_ID)
      WHERE JOB_TYPE='GEN' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'
      AND TITLE LIKE '%${SEARCH_NAME}%' ORDER BY APPROVAL_DATE DESC LIMIT 12 OFFSET ${pagecount}`,
    );
    const [count] = await conn.query(
      `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE TITLE LIKE '%${SEARCH_NAME}%' AND JOB_TYPE='GEN' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    return found
      ? Object.assign({
          statusCode: 200,
          message: '일반일자리 목록 조회 성공',
          count: count.COUNT,
          data: page,
        })
      : Object.assign({
          statusCode: 400,
          message: '일반일자리 목록 조회 실패',
        });
  }

  async getDetailJob(param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT * FROM jobInformation WHERE JOBID='${param.jobid}' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );

    if (found) {
      const [user] = await conn.query(
        `SELECT * FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${found.ENTRPRS_MBER_ID}' AND ENTRPRS_MBER_STTUS='P'`,
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
      const empdet = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empdet' AND CODE IN(${found.EMPLOYTYPE_DET})`,
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
      const doccd = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='doccd' AND CODE IN(${found.APPLY_DOCUMENT})`,
      );
      const [mealcd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='mealcd' AND CODE='${found.MEAL_COD}'`,
      );
      const socins = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='socins' AND CODE IN(${found.SOCIAL_INSURANCE})`,
      );
      const [testmt] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='testmt' AND CODE='${found.TEST_METHOD}'`,
      );

      if (
        educd &&
        career &&
        areacd &&
        timecd &&
        empcd &&
        empdet &&
        paycd &&
        sevpay &&
        clstyp &&
        apytyp &&
        doccd &&
        mealcd &&
        socins &&
        testmt
      ) {
        return Object.assign({
          statusCode: 200,
          message: '일자리 상세 조회 성공',
          data: {
            JOBID: found.JOBID,

            CMPNY_NM: user.CMPNY_NM,
            BIZRNO: user.BIZRNO,
            CEO: user.CEO,
            ADRES: user.ADRES,
            DETAIL_ADRES: user.DETAIL_ADRES,
            INDUTY: user.INDUTY,
            NMBR_WRKRS: user.NMBR_WRKRS,
            CMPNY_IM: user.CMPNY_IM,

            TITLE: found.TITLE,
            JOB_TYPE_DESC: found.JOB_TYPE_DESC,
            REQUIRE_COUNT: found.REQUIRE_COUNT,
            JOB_DESC: found.JOB_DESC,
            DEUCATION: educd.CODE_NM,
            CAREER: career.CODE_NM,
            WORK_AREA: areacd.CODE_NM,
            EMPLOYTYPE: empcd.CODE_NM,
            EMPLOYTYPE_DET: empdet,
            PAYCD: paycd.CODE_NM,
            WORK_TIME_TYPE: timecd.CODE_NM,
            ENDRECEPTION: found.ENDRECEPTION,
            CAREER_PERIOD: found.CAREER_PERIOD,
            WORK_ADDRESS: found.WORK_ADDRESS,
            WORK_AREA_DESC: found.WORK_AREA_DESC,
            PAY_AMOUNT: found.PAY_AMOUNT,
            MEAL_COD: mealcd.CODE_NM,
            WORKINGHOURS: found.WORKINGHOURS,
            SEVERANCE_PAY_TYPE: sevpay.CODE_NM,
            SOCIAL_INSURANCE: socins,
            CLOSING_TYPE: clstyp.CODE_NM,
            APPLY_METHOD: apytyp.CODE_NM,
            APPLY_METHOD_ETC: found.APPLY_METHOD_ETC,
            TEST_METHOD: testmt.CODE_NM,
            TEST_METHOD_DTC: found.TEST_METHOD_DTC,
            APPLY_DOCUMENT: doccd,
            CONTACT_NAME: found.CONTACT_NAME,
            CONTACT_DEPARTMENT: found.CONTACT_DEPARTMENT,
            CONTACT_PHONE: found.CONTACT_PHONE,
            CONTACT_EMAIL: found.CONTACT_EMAIL,
          },
        });
      } else {
        return Object.assign({
          statusCode: 404,
          message: '코드값 확인',
        });
      }
    } else {
      return Object.assign({
        statusCode: 400,
        message: '일자리 상세 조회 실패',
      });
    }
  }

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
        statusCode: 402,
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

  async enterpriseListJob(@Req() req, query) {
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();
    const [jobfound] = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y'`,
    );

    if (jobfound) {
      const found = await conn.query(
        `SELECT  B.JOBID, B.TITLE, B.CREATE_AT, B.REQUEST_DATE, B.COMENTS, A.CODE_NM AS JOB_STAT
        FROM COMTCCMMNDETAILCODE A INNER JOIN jobInformation B ON (A.CODE = B.JOB_STAT)
        WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y' ORDER BY CREATE_AT ASC LIMIT 12 OFFSET ${pagecount}`,
      );
      const [count] = await conn.query(
        `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y'`,
      );

      return Object.assign({
        statusCode: 200,
        message: '채용공고 목록 조회 성공',
        ok: true,
        count: count.COUNT,
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
      const empdet = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empdet' AND CODE IN(${found.EMPLOYTYPE_DET})`,
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
      const doccd = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='doccd' AND CODE IN(${found.APPLY_DOCUMENT})`,
      );
      const [mealcd] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='mealcd' AND CODE='${found.MEAL_COD}'`,
      );
      const socins = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='socins' AND CODE IN(${found.SOCIAL_INSURANCE})`,
      );
      const [testmt] = await conn.query(
        `SELECT CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='testmt' AND CODE='${found.TEST_METHOD}'`,
      );

      if (
        educd &&
        career &&
        areacd &&
        timecd &&
        empcd &&
        empdet &&
        paycd &&
        sevpay &&
        clstyp &&
        apytyp &&
        doccd &&
        mealcd &&
        socins &&
        testmt
      ) {
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
            EMPLOYTYPE_DET: empdet,
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
            SOCIAL_INSURANCE: socins,
            CLOSING_TYPE: clstyp.CODE_NM,
            APPLY_METHOD: apytyp.CODE_NM,
            APPLY_METHOD_ETC: found.APPLY_METHOD_ETC,
            TEST_METHOD: testmt.CODE_NM,
            TEST_METHOD_DTC: found.TEST_METHOD_DTC,
            APPLY_DOCUMENT: doccd,
            CONTACT_NAME: found.CONTACT_NAME,
            CONTACT_DEPARTMENT: found.CONTACT_DEPARTMENT,
            CONTACT_PHONE: found.CONTACT_PHONE,
            CONTACT_EMAIL: found.CONTACT_EMAIL,
          },
        });
      } else {
        return Object.assign({
          statusCode: 404,
          message: '코드값 확인',
        });
      }
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
