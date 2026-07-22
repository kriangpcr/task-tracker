import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { SupabaseModule } from '@infrastructure/services/supabase/supabase.module';
import { TaskRepository } from '@domain/repositories/database';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  UpdateTaskStatusUseCase,
  UpdateTaskUseCase,
} from '@usecases/index';

@Module({
  imports: [DatabaseModule],
})
export class TaskUsecasesProxyModule {
  static CREATE_TASK_USECASE = 'CreateTaskUseCase';
  static UPDATE_TASK_USECASE = 'UpdateTaskUseCase';
  static DELETE_TASK_USECASE = 'DeleteTaskUseCase';
  static GET_TASK_USECASE = 'GetTaskUseCase';
  static UPDATE_TASK_STATUS_USECASE = 'UpdateTaskStatusUseCase';

  static register(): DynamicModule {
    return {
      module: TaskUsecasesProxyModule,
      providers: [
        {
          inject: [TaskRepository],
          provide: TaskUsecasesProxyModule.CREATE_TASK_USECASE,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new CreateTaskUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide: TaskUsecasesProxyModule.UPDATE_TASK_USECASE,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new UpdateTaskUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide: TaskUsecasesProxyModule.DELETE_TASK_USECASE,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new DeleteTaskUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide: TaskUsecasesProxyModule.GET_TASK_USECASE,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new GetTaskUseCase(taskRepository)),
        },
        {
          inject: [TaskRepository],
          provide: TaskUsecasesProxyModule.UPDATE_TASK_STATUS_USECASE,
          useFactory: (taskRepository: TaskRepository) =>
            new UseCaseProxy(new UpdateTaskStatusUseCase(taskRepository)),
        },
      ],
      exports: [
        TaskUsecasesProxyModule.CREATE_TASK_USECASE,
        TaskUsecasesProxyModule.UPDATE_TASK_USECASE,
        TaskUsecasesProxyModule.DELETE_TASK_USECASE,
        TaskUsecasesProxyModule.GET_TASK_USECASE,
        TaskUsecasesProxyModule.UPDATE_TASK_STATUS_USECASE,
      ],
    };
  }
}
