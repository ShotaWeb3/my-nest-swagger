import { Module } from '@nestjs/common'
import { TestModule } from './test/test.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [TestModule, PrismaModule],
})
export class AppModule {}
