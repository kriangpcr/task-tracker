import { Module } from '@nestjs/common';
import { TaskUsecasesProxyModule } from '@infrastructure/usecases-proxy/task-usecase-proxy.module';
import { TaskController } from './task.controller.module';

@Module({
  imports: [TaskUsecasesProxyModule.register()],
  controllers: [TaskController],
})
export class ControllersModule {}
