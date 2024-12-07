import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'
import { CreateRequestTestDto } from '../../modules/test/dto.ts/test.dto'

@Injectable()
export class TestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(test: CreateRequestTestDto) {
    return await this.prismaService.test.create({
      data: test,
    })
  }

  async findAll() {
    return await this.prismaService.test.findMany()
  }

  async findById(id: number) {
    return await this.prismaService.test.findUnique({
      where: { id },
    })
  }
}
