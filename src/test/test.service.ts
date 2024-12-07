import { plainToInstance } from 'class-transformer'
import { TestRepository } from '../middleware/repositories/test.repository'
import { CreateRequestTestDto, CreateTestResponseDto } from './dto.ts/test.dto'

export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

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
}
