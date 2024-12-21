import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger'
import {
  CreateRequestTestDto,
  CreateTestResponseDto,
  DownloadCsvRequestDto,
  GetAsyncStatusResponseDto,
  GetTestResponseDto,
  SendAsyncMessageRequestDto,
  SendAsyncMessageResponseDto,
} from './dto.ts/test.dto'
import { TestService } from './test.service'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

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
  @ApiOkResponse({
    description: 'テストCSVダウンロードAPIの説明',
    content: {
      'text/csv': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
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
    return await this.testService.sendAsyncMessage(body.message)
  }

  @ApiOperation({
    operationId: 'test-get-async-status',
    summary: '非同期メッセージステータス取得',
    description: '非同期メッセージステータス取得APIの説明',
  })
  @ApiResponse({
    status: 200,
    type: GetAsyncStatusResponseDto,
  })
  @Get(':id/status')
  @HttpCode(HttpStatus.OK)
  async getAsyncStatus(@Param('id') id: string): Promise<GetAsyncStatusResponseDto> {
    const status = await this.testService.getStatus(id)
    return plainToInstance(GetAsyncStatusResponseDto, { status })
  }
}
