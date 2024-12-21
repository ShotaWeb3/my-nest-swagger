import { ConfigModule, ConfigService } from '@nestjs/config'
import { SqsModule } from '@ssut/nestjs-sqs'
import { Module } from '@nestjs/common'
import { MyQueueHandler } from './consumer/my-queue-handler'
import { TestModule } from 'src/modules/test/test.module'
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [
    TestModule,
    RedisModule,
    ConfigModule.forRoot(),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        consumers: [
          {
            name: configService.get('AWS_SQS_QUEUE_NAME'),
            queueUrl: configService.get('AWS_SQS_QUEUE_URL'),
          },
        ],
        region: 'ap-northeast-1',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MyQueueHandler],
})
export class SqsConsumerModule {}
