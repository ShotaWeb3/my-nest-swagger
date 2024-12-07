import { Test } from '@nestjs/testing'
import { TestService } from './test.service'
import { TestRepository } from '../../middleware/repositories/test.repository'
import { PrismaModule } from '../../infrastructure/prisma/prisma.module'

describe('TestService', () => {
  let service: TestService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TestRepository, TestService],
    }).compile()

    service = module.get<TestService>(TestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
