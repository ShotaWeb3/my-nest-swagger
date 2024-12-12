import { Test } from 'prisma/prisma-client'
import { BaseCsvStrategy } from './base-csv-strategy'
import { TestRepository } from 'src/middleware/repositories/test.repository'
import { Response } from 'express'
export class ATypeCsvStrategy extends BaseCsvStrategy<Test> {
  private readonly headerMapping = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: '名前' },
    { key: 'email', label: 'メールアドレス' },
    { key: 'description', label: '説明' },
    { key: 'createdAt', label: '作成日時' },
  ]

  constructor(
    response: Response,
    private readonly testRepository: TestRepository,
  ) {
    super(response)
  }

  getFileName(): string {
    return 'a-type.csv'
  }

  getHeader(): string[] {
    return this.headerMapping.map(({ label }) => label)
  }

  formatData(data: Test[]): string[][] {
    const formattedData = data.map(({ id, name, email, description, createdAt }) => [
      id,
      name,
      email,
      description,
      createdAt,
    ])
    return formattedData.map((item) => this.headerMapping.map(({ key }) => item[key]))
  }

  async *fetchData(): AsyncGenerator<Test[]> {
    for await (const chunk of this.testRepository.findAllChunk()) {
      yield chunk
    }
  }
}
