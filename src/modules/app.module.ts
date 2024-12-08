import { Module } from '@nestjs/common'
import { TestModule } from './test/test.module'
import { PrismaModule } from '../infrastructure/prisma/prisma.module'

@Module({
  imports: [TestModule, PrismaModule],
})
export class AppModule {}
