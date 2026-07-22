import { Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { TaskRepository } from '@domain/repositories/database';
import { Task } from '@domain/model/task.model';
import { GetTaskDto } from '@infrastructure/dtos/task/get-task.dto';
@Injectable()
export class GetTaskUseCase implements UseCase<
  {
    query: GetTaskDto;
  },
  Task[]
> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(ctx: { query: GetTaskDto }): Promise<Task[]> {
    if (ctx.query.status) {
      return await this.taskRepository.getByStatus(ctx.query.status);
    }
    return await this.taskRepository.getAll();
  }
}
