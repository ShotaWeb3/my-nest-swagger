import { Module } from '@nestjs/common'
import { TestModule } from './test/test.module'
import { PrismaModule } from '../infrastructure/prisma/prisma.module'
import { SqsProducerModule } from 'src/infrastructure/sqs/sqs-producer.module'
import { SqsConsumerModule } from 'src/infrastructure/sqs/sqs-consumer.module'
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [TestModule, PrismaModule, SqsProducerModule, SqsConsumerModule, RedisModule],
})
export class AppModule {}
