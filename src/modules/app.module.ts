import { Module } from '@nestjs/common'
import { TestModule } from './test/test.module'
import { PrismaModule } from '../infrastructure/prisma/prisma.module'
import { SqsProducerModule } from 'src/infrastructure/sqs/sqs-producer.module'

@Module({
  imports: [TestModule, PrismaModule, SqsProducerModule],
})
export class AppModule {}
