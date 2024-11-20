import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateTestDto, CreateTestResponseDto, GetTestResponseDto } from './dto.ts/test.dto'

@Controller('test')
export class TestController {
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
  async create(@Body() body: CreateTestDto): Promise<CreateTestResponseDto> {
    return {
      id: 1,
      name: body.name,
      email: body.email,
    }
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
    return {
      id,
      name: 'test',
      email: 'test@example.com',
      description: 'テストの説明',
    }
  }
}
