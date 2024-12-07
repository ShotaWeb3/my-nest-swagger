import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateRequestTestDto, CreateTestResponseDto, GetTestResponseDto } from './dto.ts/test.dto'
import { TestService } from './test.service'
import { plainToInstance } from 'class-transformer'
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
}
