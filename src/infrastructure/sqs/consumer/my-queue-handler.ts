import { Injectable } from '@nestjs/common'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'
import * as Sqs from '@aws-sdk/client-sqs'
import { MyQueueMessage } from '../types/message'
import { TestService } from 'src/modules/test/test.service'

@Injectable()
export class MyQueueHandler {
  constructor(private readonly testService: TestService) {}
  @SqsMessageHandler(process.env.AWS_SQS_QUEUE_NAME, false)
  async handleMessage(message: Sqs.Message) {
    if (!message.Body) {
      throw new Error('Message body is empty')
    }
    const body = JSON.parse(message.Body) as MyQueueMessage
    await this.testService.processHandleMessage(body)
  }

  @SqsConsumerEventHandler(process.env.AWS_SQS_QUEUE_NAME, 'processing_error')
  async handleError(message: Sqs.Message) {
    console.error('Error processing message', message)
    await this.testService.processHandleError(JSON.parse(message.Body) as MyQueueMessage)
    throw new Error('Error processing message')
  }

  @SqsConsumerEventHandler(process.env.AWS_SQS_QUEUE_NAME, 'timeout_error')
  async handleTimeoutError(message: Sqs.Message) {
    console.error('Timeout error processing message', message)
    await this.testService.processHandleError(JSON.parse(message.Body) as MyQueueMessage)
    throw new Error('Timeout error processing message')
  }
}
