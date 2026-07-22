import { CreateTaskDto } from '@infrastructure/dtos/task/create-task.dto';
import { DeleteTaskDto } from '@infrastructure/dtos/task/delete-task.dto';
import { GetTaskDto } from '@infrastructure/dtos/task/get-task.dto';
import { UpdateTaskStatusDto } from '@infrastructure/dtos/task/update-task-status.dto';
import { UpdateTaskDto } from '@infrastructure/dtos/task/update-task.dto';
import { TaskUsecasesProxyModule } from '@infrastructure/usecases-proxy/task-usecase-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  UpdateTaskStatusUseCase,
  UpdateTaskUseCase,
} from '@usecases/index';

@Controller({ path: 'task' })
@ApiTags('Task')
export class TaskController {
  constructor(
    @Inject(TaskUsecasesProxyModule.CREATE_TASK_USECASE)
    private readonly createTaskUseCase: UseCaseProxy<CreateTaskUseCase>,
    @Inject(TaskUsecasesProxyModule.UPDATE_TASK_USECASE)
    private readonly updateTaskUseCase: UseCaseProxy<UpdateTaskUseCase>,
    @Inject(TaskUsecasesProxyModule.DELETE_TASK_USECASE)
    private readonly deleteTaskUseCase: UseCaseProxy<DeleteTaskUseCase>,
    @Inject(TaskUsecasesProxyModule.GET_TASK_USECASE)
    private readonly getTaskUseCase: UseCaseProxy<GetTaskUseCase>,
    @Inject(TaskUsecasesProxyModule.UPDATE_TASK_STATUS_USECASE)
    private readonly updateTaskStatusUseCase: UseCaseProxy<UpdateTaskStatusUseCase>,
  ) {}

  @Post('/create')
  async create(@Body() body: CreateTaskDto) {
    const task = await this.createTaskUseCase.getUseCase().execute({ body });
    return task;
  }

  @Put('/update')
  async update(@Body() body: UpdateTaskDto) {
    const task = await this.updateTaskUseCase.getUseCase().execute({ body });
    return task;
  }

  @Delete('/delete')
  async delete(@Body() body: DeleteTaskDto) {
    const task = await this.deleteTaskUseCase.getUseCase().execute({ body });
    return task;
  }

  @Get()
  async get(@Query() query: GetTaskDto) {
    const task = await this.getTaskUseCase.getUseCase().execute({ query });
    return task;
  }

  @Put('/update-status')
  async updateStatus(@Body() body: UpdateTaskStatusDto) {
    const task = await this.updateTaskStatusUseCase
      .getUseCase()
      .execute({ body });
    return task;
  }
}
