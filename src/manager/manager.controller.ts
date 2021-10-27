import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateBizrnoApprovalInputDto } from './dtos/bizrno-approval.dto';
import { ManagerService } from './manager.service';

@ApiTags('관리자 API')
@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  //사업자 승인 신청자 조회
  @Get('/bizrno/approval')
  @ApiOperation({
    summary: '사업자 승인 신청자 조회(1차완료)',
  })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: '페이지 넘버',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getBizrnoApproval(@Req() req, @Query() query) {
    return await this.managerService.getBizrnoApproval(req.user, query);
  }

  //사업자 승인
  @Patch('/bizrno/approval/:userid')
  @ApiOperation({
    summary: '사업자 승인(1차완료)',
  })
  @ApiParam({
    name: 'userid',
    example: 'hee123',
    description: '유저Id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateBizrnoApproval(@Req() req, @Param() param: { userid: string }) {
    return await this.managerService.updateBizrnoApproval(req.user, param);
  }

  //사업자 승인 거절
  @Patch('/bizrno/approval/refuse/:userid')
  @ApiOperation({
    summary: '사업자 승인 거절(1차완료)',
  })
  @ApiParam({
    name: 'userid',
    example: 'hee123',
    description: '유저Id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateBizrnoRefuse(@Req() req, @Param() param: { userid: string }) {
    return await this.managerService.updateBizrnoRefuse(req.user, param);
  }

  //채용공고 승인 신청자 조회
  @Get('/job/approval')
  @ApiOperation({
    summary: '채용공고 승인 신청자 조회(1차완료)',
  })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: '페이지 넘버',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getJobApproval(@Req() req, @Query() query) {
    return await this.managerService.getJobApproval(req.user, query);
  }

  //채용공고 승인
  @Patch('/job/approval/:userid')
  @ApiOperation({
    summary: '채용공고 승인(1차완료)',
  })
  @ApiBody({
    description: '코멘트 정보',
    type: UpdateBizrnoApprovalInputDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateJobApproval(
    @Req() req,
    @Body(ValidationPipe)
    updateBizrnoApprovalInputDto: UpdateBizrnoApprovalInputDto,
  ) {
    return await this.managerService.updateJobApproval(
      req.user,
      updateBizrnoApprovalInputDto,
    );
  }

  //채용공고 승인 거절
  @Patch('/job/approval/refuse/:userid')
  @ApiOperation({
    summary: '채용공고 승인 거절(1차완료)',
  })
  @ApiBody({
    description: '코멘트 정보',
    type: UpdateBizrnoApprovalInputDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateJobRefuse(
    @Req() req,
    @Body(ValidationPipe)
    updateBizrnoApprovalInputDto: UpdateBizrnoApprovalInputDto,
  ) {
    return await this.managerService.updateJobRefuse(
      req.user,
      updateBizrnoApprovalInputDto,
    );
  }
}
