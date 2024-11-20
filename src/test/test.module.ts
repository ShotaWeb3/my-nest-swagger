import { Module } from '@nestjs/common'
import { TestController } from './test.contoller'

@Module({
  controllers: [TestController],
})
export class TestModule {}
