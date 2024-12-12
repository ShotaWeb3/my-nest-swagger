import { Response } from 'express'
import { format } from '@fast-csv/format'

export interface ICsvStrategy<T> {
  getHeader(): string[]
  formatData(data: T[]): string[][]
  getFileName(): string
  generateCsv(): void
  fetchData(): AsyncGenerator<T[]>
}

export abstract class BaseCsvStrategy<T> implements ICsvStrategy<T> {
  abstract getHeader(): string[]
  abstract formatData(data: T[]): string[][]
  abstract getFileName(): string
  abstract fetchData(): AsyncGenerator<T[]>
  protected response: Response

  constructor(response: Response) {
    response.writeHead(200, {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${this.getFileName()}"`,
    })
    this.response = response
  }

  async generateCsv(): Promise<void> {
    const csvStream = format({ headers: this.getHeader() })
    csvStream.pipe(this.response)

    for await (const row of this.fetchData()) {
      const formattedRows = this.formatData(row)
      formattedRows.forEach((row) => {
        csvStream.write(row)
      })
    }
    csvStream.end()
  }
}
