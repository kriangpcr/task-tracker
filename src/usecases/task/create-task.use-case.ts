import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { TaskRepository } from '@domain/repositories/database';
import { Task, TaskStatus } from '@domain/model/task.model';
import { CreateTaskDto } from '@infrastructure/dtos/task/create-task.dto';
@Injectable()
export class CreateTaskUseCase implements UseCase<
  {
    body: CreateTaskDto;
  },
  Task
> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(ctx: { body: CreateTaskDto }): Promise<Task> {
    const task = Task.create({
      detail: ctx.body.detail,
      status: TaskStatus.NOT_DONE,
    });
    const response = await this.taskRepository.create(task);
    return response;
  }
}
