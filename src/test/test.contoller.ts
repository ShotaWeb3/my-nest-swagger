import { Controller, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

@Controller('test')
export class TestController {
  @ApiOperation({ summary: 'テストAPI', description: 'テストAPIの説明' })
  @Post()
  async create() {
    return 'test'
  }
}
