import { SqsModule } from '@ssut/nestjs-sqs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        producers: [
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
})
export class SqsProducerModule {}
