import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { TaskRepository } from '@domain/repositories/database';
import { Task } from '@domain/model/task.model';
import { UpdateTaskDto } from '@infrastructure/dtos/task/update-task.dto';
import { TaskStatus } from '@prisma/client';
@Injectable()
export class UpdateTaskUseCase implements UseCase<
  {
    body: UpdateTaskDto;
  },
  Task
> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(ctx: { body: UpdateTaskDto }): Promise<Task> {
    let task = await this.taskRepository.getById(ctx.body.id);
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    task = Task.update(task, ctx.body);
    const response = await this.taskRepository.update(task);
    return response;
  }
}
