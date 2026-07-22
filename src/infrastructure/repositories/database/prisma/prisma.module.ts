import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTaskRepository } from './repositories';
import { TaskRepository } from '@domain/repositories/database';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';

const prismaRepositories = [
  { provide: TaskRepository, useClass: PrismaTaskRepository },
];

@Module({
  imports: [EnvironmentConfigModule],
  providers: [PrismaService, ...prismaRepositories],
  exports: [PrismaService, ...prismaRepositories],
})
export class PrismaModule {}
