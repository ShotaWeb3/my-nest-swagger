import { Injectable } from '@nestjs/common'
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs'
import * as Sqs from '@aws-sdk/client-sqs'
import { MyQueueMessage } from '../types/message'

@Injectable()
export class MyQueueHandler {
  @SqsMessageHandler(process.env.AWS_SQS_QUEUE_NAME, false)
  async handleMessage(message: Sqs.Message) {
    if (!message.Body) {
      throw new Error('Message body is empty')
    }
    const body = JSON.parse(message.Body) as MyQueueMessage
    console.log(body)
  }

  @SqsConsumerEventHandler(process.env.AWS_SQS_QUEUE_NAME, 'processing_error')
  async handleError(message: Sqs.Message) {
    console.error('Error processing message', message)
  }

  @SqsConsumerEventHandler(process.env.AWS_SQS_QUEUE_NAME, 'timeout_error')
  async handleTimeoutError(message: Sqs.Message) {
    console.error('Timeout error processing message', message)
  }
}
