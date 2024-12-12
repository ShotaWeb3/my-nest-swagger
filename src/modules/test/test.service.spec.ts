import { Test } from '@nestjs/testing'
import { TestService } from './test.service'
import { TestRepository } from '../../middleware/repositories/test.repository'
import { PrismaModule } from '../../infrastructure/prisma/prisma.module'
import { Response } from 'express'
import { DownloadCsvRequestDto, CsvFormatType } from './dto.ts/test.dto'
import * as fastCsv from '@fast-csv/format'
import { CsvFormatterStream } from 'fast-csv'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'

describe('TestService', () => {
  let service: TestService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TestRepository, TestService],
    }).compile()

    service = module.get<TestService>(TestService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('downloadCsv', () => {
    it('should download csv', async () => {
      const mockCsvStream = {
        pipe: jest.fn().mockReturnThis(),
        write: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis(),
      } as unknown as CsvFormatterStream<any, any>

      jest.spyOn(fastCsv, 'format').mockReturnValue(mockCsvStream)

      const mockResponse = {
        writeHead: jest.fn(),
        write: jest.fn(),
      } as unknown as Response

      const request: DownloadCsvRequestDto = {
        formatType: CsvFormatType.A_TYPE,
      }
      await service.downloadCsv(request, mockResponse)
      const expected = await prismaService.test.findFirst()

      expect(mockResponse.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${'a-type.csv'}"`,
      })
      expect(mockCsvStream.pipe).toHaveBeenCalled()
      expect(mockCsvStream.write).toHaveBeenCalledWith([
        expected.id,
        expected.name,
        expected.email,
        expected.description,
        expected.createdAt
          .toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
          .replace(/\//g, '-'),
      ])
      expect(mockCsvStream.end).toHaveBeenCalled()
    })
  })
})
