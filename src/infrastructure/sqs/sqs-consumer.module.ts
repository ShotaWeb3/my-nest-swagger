import { ConfigModule, ConfigService } from '@nestjs/config'
import { SqsModule } from '@ssut/nestjs-sqs'
import { Module } from '@nestjs/common'
import { MyQueueHandler } from './consumer/my-queue-handler'

@Module({
  imports: [
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
