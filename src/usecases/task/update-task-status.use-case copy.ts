import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { TaskRepository } from '@domain/repositories/database';
import { Task, TaskStatus } from '@domain/model/task.model';
import { UpdateTaskStatusDto } from '@infrastructure/dtos/task/update-task-status.dto';
@Injectable()
export class UpdateTaskStatusUseCase implements UseCase<
  {
    body: UpdateTaskStatusDto;
  },
  Task
> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(ctx: { body: UpdateTaskStatusDto }): Promise<Task> {
    let task = await this.taskRepository.getById(ctx.body.id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (ctx.body.status == TaskStatus.DONE) {
      task = Task.markDone(task);
    } else if (ctx.body.status == TaskStatus.IN_PROGRESS) {
      task = Task.markInProgress(task);
    }
    return await this.taskRepository.update(task);
  }
}
