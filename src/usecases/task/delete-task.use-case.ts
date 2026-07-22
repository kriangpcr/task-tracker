import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { TaskRepository } from '@domain/repositories/database';
import { Task } from '@domain/model/task.model';
import { DeleteTaskDto } from '@infrastructure/dtos/task/delete-task.dto';
@Injectable()
export class DeleteTaskUseCase implements UseCase<
  {
    body: DeleteTaskDto;
  },
  Task
> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(ctx: { body: DeleteTaskDto }): Promise<Task> {
    let task = await this.taskRepository.getById(ctx.body.id);
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    const response = await this.taskRepository.remove(ctx.body.id);
    return response;
  }
}
