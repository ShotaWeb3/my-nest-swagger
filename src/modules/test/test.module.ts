import { Module } from '@nestjs/common'
import { TestController } from './test.contoller'
import { TestRepository } from 'src/middleware/repositories/test.repository'
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'
import { TestService } from './test.service'
import { SqsProducerModule } from 'src/infrastructure/sqs/sqs-producer.module'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from 'src/infrastructure/redis/redis.module'

@Module({
  imports: [PrismaModule, SqsProducerModule, ConfigModule, RedisModule],
  providers: [TestRepository, TestService],
  controllers: [TestController],
  exports: [TestService, TestRepository],
})
export class TestModule {}
