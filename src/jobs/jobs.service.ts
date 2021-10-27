import { Injectable, Logger, Req } from '@nestjs/common';
import { createImageURL } from 'src/auth/multerOptions';
import { getConnection } from 'typeorm';
import { JobEnterpriseRegisterInputDto } from './dtos/job-enterprise.dto';
import { GetUserBySearchInputDto } from './dtos/job-public.dto';

@Injectable()
export class BoardsService {
  private logger = new Logger('JobsService');
  async getPublicJob(getUserBySearchInputDto: GetUserBySearchInputDto, query) {
    const { SEARCH_NAME } = getUserBySearchInputDto;
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();
    const found = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE JOB_TYPE='PUB' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    const page = await conn.query(
      `SELECT  B.JOBID, A.CMPNY_NM, 
      IFNULL(B.JOB_IM,'') AS JOB_IM, B.TITLE, B.JOB_TYPE_DESC, 
      IFNULL(B.WORK_ADDRESS, '') AS WORK_ADDRESS, C.CODE_NM AS CAREER, B.JOB_DESC, 
      IFNULL(B.STARTRECEPTION,'') AS STARTRECEPTION,  
      IFNULL(B.ENDRECEPTION, '') AS ENDRECEPTION, 
      IFNULL(B.APPROVAL_DATE,'') AS APPROVAL_DATE
      FROM COMTNENTRPRSMBER A 
      INNER JOIN jobInformation B ON (A.ENTRPRS_MBER_ID = B.ENTRPRS_MBER_ID)
      INNER JOIN COMTCCMMNDETAILCODE C ON (B.CAREER = C.CODE)
      WHERE JOB_TYPE='PUB' AND JOB_STTUS='Y' AND JOB_STAT='APPRV' AND CODE_ID='career' AND USE_AT ='Y'
      AND TITLE LIKE '%${SEARCH_NAME}%' ORDER BY CREATE_AT DESC LIMIT 12 OFFSET ${pagecount}`,
    );
    const [count] = await conn.query(
      `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE TITLE LIKE '%${SEARCH_NAME}%' AND JOB_TYPE='PUB' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );

    if (found) {
      if (page.length != 0) {
        this.logger.log(`공공일자리 목록 조회 성공`);
        return Object.assign({
          statusCode: 200,
          message: '공공일자리 목록 조회 성공',
          count: count.COUNT,
          data: page,
        });
      } else {
        this.logger.warn(`공공일자리 목록 조회 실패`);
        return Object.assign({
          statusCode: 400,
          message: '공공일자리 목록 조회 실패',
        });
      }
    } else {
      this.logger.warn(`공공일자리 목록 조회 실패`);
      return Object.assign({
        statusCode: 400,
        message: '공공일자리 목록 조회 실패',
      });
    }
  }

  async getGeneralJob(getUserBySearchInputDto: GetUserBySearchInputDto, query) {
    const { SEARCH_NAME } = getUserBySearchInputDto;
    var pagecount = (query.page - 1) * 12;
    const conn = getConnection();
    const found = await conn.query(
      `SELECT JOBID FROM jobInformation WHERE JOB_TYPE='GEN' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    const page = await conn.query(
      `SELECT  B.JOBID, A.CMPNY_NM, 
      IFNULL(B.JOB_IM,'') AS JOB_IM, B.TITLE, B.JOB_TYPE_DESC, 
      IFNULL(B.WORK_ADDRESS, '') AS WORK_ADDRESS, C.CODE_NM AS CAREER, B.JOB_DESC, 
      IFNULL(B.STARTRECEPTION,'') AS STARTRECEPTION,  
      IFNULL(B.ENDRECEPTION, '') AS ENDRECEPTION, 
      IFNULL(B.APPROVAL_DATE,'') AS APPROVAL_DATE
      FROM COMTNENTRPRSMBER A 
      INNER JOIN jobInformation B ON (A.ENTRPRS_MBER_ID = B.ENTRPRS_MBER_ID)
      INNER JOIN COMTCCMMNDETAILCODE C ON (B.CAREER = C.CODE)
      WHERE JOB_TYPE='GEN' AND JOB_STTUS='Y' AND JOB_STAT='APPRV' AND CODE_ID='career' AND USE_AT ='Y'
      AND TITLE LIKE '%${SEARCH_NAME}%' ORDER BY CREATE_AT DESC LIMIT 12 OFFSET ${pagecount}`,
    );
    const [count] = await conn.query(
      `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE TITLE LIKE '%${SEARCH_NAME}%' AND JOB_TYPE='GEN' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );

    if (found) {
      if (page.length != 0) {
        this.logger.log(`일반일자리 목록 조회 성공`);
        return Object.assign({
          statusCode: 200,
          message: '일반일자리 목록 조회 성공',
          count: count.COUNT,
          data: page,
        });
      } else {
        this.logger.warn(`일반일자리 목록 조회 실패`);
        return Object.assign({
          statusCode: 400,
          message: '일반일자리 목록 조회 실패',
        });
      }
    } else {
      this.logger.warn(`일반일자리 목록 조회 실패`);
      return Object.assign({
        statusCode: 400,
        message: '일반일자리 목록 조회 실패',
      });
    }
  }

  async getDetailJob(param: { jobid: number }) {
    const conn = getConnection();

    const [found] = await conn.query(
      `SELECT * FROM jobInformation WHERE JOBID='${param.jobid}' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    const [job_im] = await conn.query(
      `SELECT IFNULL(JOB_IM, '') AS JOB_IM FROM jobInformation WHERE JOBID='${param.jobid}' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );
    const [endreception] = await conn.query(
      `SELECT IFNULL(ENDRECEPTION, '') AS ENDRECEPTION FROM jobInformation WHERE JOBID='${param.jobid}' AND JOB_STTUS='Y' AND JOB_STAT='APPRV'`,
    );

    if (found) {
      const [user] = await conn.query(
        `SELECT CMPNY_NM, BIZRNO, 
        IFNULL(CEO, '') AS CEO,
        IFNULL(ADRES, '') AS ADRES,
        IFNULL(DETAIL_ADRES, '') AS DETAIL_ADRES,
        IFNULL(INDUTY, '') AS INDUTY,
        IFNULL(NMBR_WRKRS, '') AS NMBR_WRKRS,
        IFNULL(CMPNY_IM, '') AS CMPNY_IM FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${found.ENTRPRS_MBER_ID}' AND ENTRPRS_MBER_STTUS='P'`,
      );

      const [educd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='educd' AND CODE='${found.DEUCATION}' AND USE_AT ='Y'`,
      );
      const [career] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='career' AND CODE='${found.CAREER}' AND USE_AT ='Y'`,
      );
      const [areacd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='areacd' AND CODE='${found.WORK_AREA}' AND USE_AT ='Y'`,
      );
      const [timecd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='timecd' AND CODE='${found.WORK_TIME_TYPE}' AND USE_AT ='Y'`,
      );
      const [empcd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empcd' AND CODE='${found.EMPLOYTYPE}' AND USE_AT ='Y'`,
      );
      const empdet = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empdet' AND CODE IN(${found.EMPLOYTYPE_DET}) AND USE_AT ='Y'`,
      );
      const [paycd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='paycd' AND CODE='${found.PAYCD}' AND USE_AT ='Y'`,
      );
      const [sevpay] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='sevpay' AND CODE='${found.SEVERANCE_PAY_TYPE}' AND USE_AT ='Y'`,
      );
      const [clstyp] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='clstyp' AND CODE='${found.CLOSING_TYPE}' AND USE_AT ='Y'`,
      );
      const apytyp = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='apytyp' AND CODE IN(${found.APPLY_METHOD}) AND USE_AT ='Y'`,
      );
      const doccd = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='doccd' AND CODE IN(${found.APPLY_DOCUMENT}) AND USE_AT ='Y'`,
      );
      const [mealcd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='mealcd' AND CODE='${found.MEAL_COD}' AND USE_AT ='Y'`,
      );
      const socins = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='socins' AND CODE IN(${found.SOCIAL_INSURANCE}) AND USE_AT ='Y'`,
      );
      const testmt = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='testmt' AND CODE IN(${found.TEST_METHOD}) AND USE_AT ='Y'`,
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
        this.logger.log(`일자리 상세 조회 성공`);
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
            JOB_IM: job_im.JOB_IM,

            TITLE: found.TITLE,
            JOB_TYPE_DESC: found.JOB_TYPE_DESC,
            REQUIRE_COUNT: found.REQUIRE_COUNT,
            JOB_DESC: found.JOB_DESC,
            DEUCATION: educd,
            CAREER: career,
            WORK_AREA: areacd,
            EMPLOYTYPE: empcd,
            EMPLOYTYPE_DET: empdet,
            PAYCD: paycd,
            WORK_TIME_TYPE: timecd,
            ENDRECEPTION: endreception.ENDRECEPTION,
            CAREER_PERIOD: found.CAREER_PERIOD,
            WORK_ADDRESS: found.WORK_ADDRESS,
            WORK_AREA_DESC: found.WORK_AREA_DESC,
            PAY_AMOUNT: found.PAY_AMOUNT,
            MEAL_COD: mealcd,
            WORKINGHOURS: found.WORKINGHOURS,
            SEVERANCE_PAY_TYPE: sevpay,
            SOCIAL_INSURANCE: socins,
            CLOSING_TYPE: clstyp,
            APPLY_METHOD: apytyp,
            APPLY_METHOD_ETC: found.APPLY_METHOD_ETC,
            TEST_METHOD: testmt,
            TEST_METHOD_DTC: found.TEST_METHOD_DTC,
            APPLY_DOCUMENT: doccd,
            CONTACT_NAME: found.CONTACT_NAME,
            CONTACT_DEPARTMENT: found.CONTACT_DEPARTMENT,
            CONTACT_PHONE: found.CONTACT_PHONE,
            CONTACT_EMAIL: found.CONTACT_EMAIL,
          },
        });
      } else {
        this.logger.warn(`코드값 확인`);
        return Object.assign({
          statusCode: 404,
          message: '코드값 확인',
        });
      }
    } else {
      this.logger.warn(`일자리 상세 조회 실패`);
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
      WHERE   A.CODE_ID = 'apytyp' AND A.USE_AT ='Y'`,
    );
    const educd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'educd' AND A.USE_AT ='Y'`,
    );
    const career = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'career' AND A.USE_AT ='Y'`,
    );
    const areacd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'areacd' AND A.USE_AT ='Y'`,
    );
    const timecd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'timecd' AND A.USE_AT ='Y'`,
    );
    const empcd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'empcd' AND A.USE_AT ='Y'`,
    );
    const empdet = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'empdet' AND A.USE_AT ='Y'`,
    );
    const paycd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'paycd' AND A.USE_AT ='Y'`,
    );
    const sevpay = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'sevpay' AND A.USE_AT ='Y'`,
    );
    const clstyp = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'clstyp' AND A.USE_AT ='Y'`,
    );
    const doccd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'doccd' AND A.USE_AT ='Y'`,
    );
    const mealcd = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'mealcd' AND A.USE_AT ='Y'`,
    );
    const socins = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'socins' AND A.USE_AT ='Y'`,
    );
    const testmt = await conn.query(
      `SELECT  A.CODE_ID_NM,  B.CODE, B.CODE_NM
      FROM    COMTCCMMNCODE A INNER JOIN COMTCCMMNDETAILCODE  B  ON (A.CODE_ID = B.CODE_ID)
      WHERE   A.CODE_ID = 'testmt' AND A.USE_AT ='Y'`,
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
    files: string,
  ) {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
      // http://주소:포트번호/upload/파일이름 형식으로 저장이 됩니다.
    }
    var {
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

    var ENDRECEPTION = ENDRECEPTION;
    if (ENDRECEPTION == '') {
      ENDRECEPTION = null;
    }

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
        this.logger.warn(`기업구분 오류
        User Id: ${req.USER_ID}`);
        return Object.assign({
          statusCode: 404,
          message: '기업구분 오류',
        });
      }
      var imageUrl;
      if (generatedFiles[0]) {
        imageUrl = generatedFiles[0];
      } else {
        const [image] = await conn.query(
          `SELECT URL FROM image WHERE NAME='JOB_IMAGE_URL'`,
        );
        imageUrl = image.URL;
      }

      var sql =
        'INSERT INTO jobInformation (ENTRPRS_MBER_ID,TITLE,JOB_IM,JOB_TYPE_DESC,REQUIRE_COUNT,JOB_DESC,DEUCATION,CAREER,CAREER_PERIOD,WORK_AREA,WORK_ADDRESS,WORK_AREA_DESC,EMPLOYTYPE,EMPLOYTYPE_DET,PAYCD,PAY_AMOUNT,WORK_TIME_TYPE,MEAL_COD,WORKINGHOURS,SEVERANCE_PAY_TYPE,SOCIAL_INSURANCE,CLOSING_TYPE,ENDRECEPTION,APPLY_METHOD,APPLY_METHOD_ETC,TEST_METHOD,TEST_METHOD_DTC,APPLY_DOCUMENT,CONTACT_NAME,CONTACT_DEPARTMENT,CONTACT_PHONE,CONTACT_EMAIL,JOB_TYPE,CREATE_AT) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())';
      var params = [
        found.ENTRPRS_MBER_ID,
        TITLE,
        imageUrl,
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
      const [jobid] = await conn.query(
        `SELECT JOBID FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' ORDER BY CREATE_AT DESC LIMIT 1`,
      );
      this.logger.log(`채용공고 등록 성공
      User Id: ${req.USER_ID}`);
      return Object.assign({
        statusCode: 201,
        message: '채용공고 등록 성공',
        jobid: jobid.JOBID,
      });
    } else {
      this.logger.warn(`사업자등록번호 승인 필요
      User Id: ${req.USER_ID}`);
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
    files: string,
  ) {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
      // http://주소:포트번호/upload/파일이름 형식으로 저장이 됩니다.
    }
    var {
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

    var ENDRECEPTION = ENDRECEPTION;
    if (ENDRECEPTION == '') {
      ENDRECEPTION = null;
    }

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
      if (generatedFiles[0]) {
        await conn.query(
          `UPDATE jobInformation SET JOB_IM='${generatedFiles[0]}' WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}'`,
        );
        this.logger.log(`채용공고 수정 성공
        User Id: ${req.USER_ID}
        Job Id: ${param.jobid}`);
        return Object.assign({
          statusCode: 200,
          message: '채용공고 수정 성공',
        });
      } else {
        this.logger.warn(`채용공고 수정 실패
        User Id: ${req.USER_ID}
        Job Id: ${param.jobid}`);
        return Object.assign({
          statusCode: 400,
          message: '채용공고 수정 실패',
        });
      }
    } else {
      this.logger.warn(`일자리 정보 error
        User Id: ${req.USER_ID}
        Job Id: ${param.jobid}`);
      return Object.assign({
        statusCode: 404,
        message: '일자리 정보 error',
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
      this.logger.log(`채용공고 심사요청 성공`);
      return Object.assign({
        statusCode: 200,
        message: '채용공고 심사요청 성공',
      });
    } else {
      this.logger.warn(`채용공고 심사요청 실패`);
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
        `SELECT  B.JOBID, B.TITLE, B.CREATE_AT, 
        IFNULL(B.REQUEST_DATE, '') AS REQUEST_DATE, 
        IFNULL(B.COMENTS, '') AS COMENTS,
        B.JOB_STAT AS JOB_STAT_CODE,
        A.CODE_NM AS JOB_STAT_NAME
        FROM COMTCCMMNDETAILCODE A INNER JOIN jobInformation B ON (A.CODE = B.JOB_STAT)
        WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y' AND CODE_ID='jstat' AND USE_AT ='Y' ORDER BY CREATE_AT DESC LIMIT 12 OFFSET ${pagecount}`,
      );
      const [count] = await conn.query(
        `SELECT COUNT(JOBID) AS COUNT FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOB_STTUS='Y'`,
      );
      if (found != 0) {
        this.logger.log(`채용공고 목록 조회 성공`);
        return Object.assign({
          statusCode: 200,
          message: '채용공고 목록 조회 성공',
          ok: true,
          count: count.COUNT,
          data: found,
        });
      } else {
        this.logger.warn(`채용공고 목록 조회 실패`);
        return Object.assign({
          statusCode: 200,
          message: '채용공고 목록 조회 실패',
          ok: false,
        });
      }
    } else {
      this.logger.warn(`채용공고 등록 필요`);
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

    const [job_im] = await conn.query(
      `SELECT IFNULL(JOB_IM, '') AS JOB_IM FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND JOB_STTUS='Y'`,
    );

    const [endreception] = await conn.query(
      `SELECT IFNULL(ENDRECEPTION, '') AS ENDRECEPTION FROM jobInformation WHERE ENTRPRS_MBER_ID='${req.USER_ID}' AND JOBID='${param.jobid}' AND JOB_STTUS='Y'`,
    );

    if (found) {
      const [user] = await conn.query(
        `SELECT CMPNY_NM, BIZRNO, 
        IFNULL(CEO, '') AS CEO,
        IFNULL(ADRES, '') AS ADRES,
        IFNULL(DETAIL_ADRES, '') AS DETAIL_ADRES,
        IFNULL(INDUTY, '') AS INDUTY,
        IFNULL(NMBR_WRKRS, '') AS NMBR_WRKRS,
        IFNULL(CMPNY_IM, '') AS CMPNY_IM FROM COMTNENTRPRSMBER WHERE ENTRPRS_MBER_ID='${req.USER_ID}'`,
      );
      const [educd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='educd' AND CODE='${found.DEUCATION}' AND USE_AT ='Y'`,
      );
      const [career] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='career' AND CODE='${found.CAREER}' AND USE_AT ='Y'`,
      );
      const [areacd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='areacd' AND CODE='${found.WORK_AREA}' AND USE_AT ='Y'`,
      );
      const [timecd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='timecd' AND CODE='${found.WORK_TIME_TYPE}' AND USE_AT ='Y'`,
      );
      const [empcd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empcd' AND CODE='${found.EMPLOYTYPE}' AND USE_AT ='Y'`,
      );
      const empdet = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='empdet' AND CODE IN(${found.EMPLOYTYPE_DET}) AND USE_AT ='Y'`,
      );
      const [paycd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='paycd' AND CODE='${found.PAYCD}' AND USE_AT ='Y'`,
      );
      const [sevpay] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='sevpay' AND CODE='${found.SEVERANCE_PAY_TYPE}' AND USE_AT ='Y'`,
      );
      const [clstyp] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='clstyp' AND CODE='${found.CLOSING_TYPE}' AND USE_AT ='Y'`,
      );
      const apytyp = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='apytyp' AND CODE IN(${found.APPLY_METHOD}) AND USE_AT ='Y'`,
      );
      const doccd = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='doccd' AND CODE IN(${found.APPLY_DOCUMENT}) AND USE_AT ='Y'`,
      );
      const [mealcd] = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='mealcd' AND CODE='${found.MEAL_COD}' AND USE_AT ='Y'`,
      );
      const socins = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='socins' AND CODE IN(${found.SOCIAL_INSURANCE}) AND USE_AT ='Y'`,
      );
      const testmt = await conn.query(
        `SELECT CODE, CODE_NM FROM COMTCCMMNDETAILCODE WHERE CODE_ID ='testmt' AND CODE IN(${found.TEST_METHOD}) AND USE_AT ='Y'`,
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
        this.logger.log(`채용공고 상세 조회 성공`);
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
            CMPNY_IM: user.CMPNY_IM,
            JOB_IM: job_im.JOB_IM,

            TITLE: found.TITLE,
            JOB_TYPE_DESC: found.JOB_TYPE_DESC,
            REQUIRE_COUNT: found.REQUIRE_COUNT,
            JOB_DESC: found.JOB_DESC,
            DEUCATION: educd,
            CAREER: career,
            WORK_AREA: areacd,
            EMPLOYTYPE: empcd,
            EMPLOYTYPE_DET: empdet,
            PAYCD: paycd,
            WORK_TIME_TYPE: timecd,
            STARTRECEPTION: found.STARTRECEPTION,
            ENDRECEPTION: endreception.ENDRECEPTION,
            CAREER_PERIOD: found.CAREER_PERIOD,
            WORK_ADDRESS: found.WORK_ADDRESS,
            WORK_AREA_DESC: found.WORK_AREA_DESC,
            PAY_AMOUNT: found.PAY_AMOUNT,
            MEAL_COD: mealcd,
            WORKINGHOURS: found.WORKINGHOURS,
            SEVERANCE_PAY_TYPE: sevpay,
            SOCIAL_INSURANCE: socins,
            CLOSING_TYPE: clstyp,
            APPLY_METHOD: apytyp,
            APPLY_METHOD_ETC: found.APPLY_METHOD_ETC,
            TEST_METHOD: testmt,
            TEST_METHOD_DTC: found.TEST_METHOD_DTC,
            APPLY_DOCUMENT: doccd,
            CONTACT_NAME: found.CONTACT_NAME,
            CONTACT_DEPARTMENT: found.CONTACT_DEPARTMENT,
            CONTACT_PHONE: found.CONTACT_PHONE,
            CONTACT_EMAIL: found.CONTACT_EMAIL,
          },
        });
      } else {
        this.logger.warn(`코드값 확인`);
        return Object.assign({
          statusCode: 404,
          message: '코드값 확인',
        });
      }
    } else {
      this.logger.warn(`채용공고 상세 조회 실패`);
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
      this.logger.log(`채용공고 삭제 성공`);
      return Object.assign({
        statusCode: 200,
        message: '채용공고 삭제 성공',
      });
    } else {
      this.logger.warn(`채용공고 삭제 실패`);
      return Object.assign({
        statusCode: 400,
        message: '채용공고 삭제 실패',
      });
    }
  }
}
