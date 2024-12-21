import { Module } from '@nestjs/common'
import { TestController } from './test.contoller'
import { TestRepository } from 'src/middleware/repositories/test.repository'
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'
import { TestService } from './test.service'
import { SqsProducerModule } from 'src/infrastructure/sqs/sqs-producer.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PrismaModule, SqsProducerModule, ConfigModule],
  providers: [TestRepository, TestService],
  controllers: [TestController],
})
export class TestModule {}
