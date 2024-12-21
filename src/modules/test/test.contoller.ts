import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger'
import {
  CreateRequestTestDto,
  CreateTestResponseDto,
  DownloadCsvRequestDto,
  GetTestResponseDto,
  SendAsyncMessageRequestDto,
  SendAsyncMessageResponseDto,
} from './dto.ts/test.dto'
import { TestService } from './test.service'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { SqsService } from '@ssut/nestjs-sqs'
import { ConfigService } from '@nestjs/config'

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({
    operationId: 'test-create',
    summary: 'テスト作成',
    description: 'テスト作成APIの説明',
  })
  @ApiResponse({
    status: 200,
    type: CreateTestResponseDto,
  })
  @ApiOkResponse({
    type: CreateTestResponseDto,
  })
  async create(@Body() body: CreateRequestTestDto): Promise<CreateTestResponseDto> {
    return await this.testService.create(body)
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'test-get',
    summary: 'テスト取得',
    description: 'テスト取得APIの説明',
  })
  @ApiOkResponse({
    type: GetTestResponseDto,
  })
  @ApiBearerAuth()
  async get(@Param('id') id: number): Promise<GetTestResponseDto> {
    const result = await this.testService.findById(id)
    return plainToInstance(GetTestResponseDto, result, { excludeExtraneousValues: true })
  }

  @ApiOperation({
    operationId: 'test-download-csv',
    summary: 'テストCSVダウンロード',
    description: 'テストCSVダウンロードAPIの説明',
  })
  @ApiProduces('text/csv')
  @Post('download-csv')
  @HttpCode(HttpStatus.OK)
  async downloadCsv(@Body() body: DownloadCsvRequestDto, @Res() response: Response): Promise<void> {
    await this.testService.downloadCsv(body, response)
  }

  @ApiOperation({
    operationId: 'test-send-async-message',
    summary: '非同期メッセージ送信',
    description: '非同期メッセージ送信APIの説明',
  })
  @ApiResponse({
    status: 200,
    type: SendAsyncMessageResponseDto,
  })
  @Post('send-async-message')
  @HttpCode(HttpStatus.OK)
  async sendAsyncMessage(@Body() body: SendAsyncMessageRequestDto): Promise<SendAsyncMessageResponseDto> {
    await this.testService.sendAsyncMessage(body.message)
    return {
      status: 'success',
    }
  }
}
