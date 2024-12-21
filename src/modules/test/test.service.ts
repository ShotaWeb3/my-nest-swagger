import { plainToInstance } from 'class-transformer'
import { TestRepository } from '../../middleware/repositories/test.repository'
import { CreateRequestTestDto, CreateTestResponseDto, CsvFormatType, DownloadCsvRequestDto } from './dto.ts/test.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { match } from 'ts-pattern'
import { ATypeCsvStrategy } from '../../infrastructure/csv/a-type-csv-strategy'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { SqsService } from '@ssut/nestjs-sqs'

@Injectable()
export class TestService {
  constructor(
    private readonly testRepository: TestRepository,
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {}

  async create(test: CreateRequestTestDto) {
    return await this.testRepository.create(test).then((result) => {
      return plainToInstance(CreateTestResponseDto, result, { excludeExtraneousValues: true })
    })
  }

  async findAll() {
    return await this.testRepository.findAll()
  }

  async findById(id: number) {
    return await this.testRepository.findById(id)
  }

  async downloadCsv(request: DownloadCsvRequestDto, response: Response) {
    const formatType = request.formatType
    const strategy = match(formatType)
      .with(CsvFormatType.A_TYPE, () => new ATypeCsvStrategy(response, this.testRepository))
      .otherwise(() => {
        throw new BadRequestException('Invalid format type')
      })
    await strategy.generateCsv()
  }

  async sendAsyncMessage(body: string) {
    const id = crypto.randomUUID()
    await this.sqsService.send(this.configService.get('AWS_SQS_QUEUE_NAME'), {
      id,
      body,
    })
  }
}
