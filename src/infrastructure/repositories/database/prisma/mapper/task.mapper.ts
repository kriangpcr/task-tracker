import { Task, TaskStatus } from '@domain/model';
import { Task as PrismaTask } from '@prisma/client';

export class PrismaTaskMapper {
  public static toPrisma(task: Partial<Task>): PrismaTask {
    return {
      id: task.id,
      detail: task.detail,
      status: task.status,
      created_at: task.created_at,
      updated_at: task.updated_at,
    };
  }

  public static toDomain(task: PrismaTask): Task {
    if (!task) return null;
    return Task.reconstitute({
      id: task.id,
      detail: task.detail,
      status: task.status as TaskStatus,
      created_at: task.created_at,
      updated_at: task.updated_at,
    });
  }
}
