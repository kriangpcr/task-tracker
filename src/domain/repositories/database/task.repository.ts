import { Task, TaskStatus } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class TaskRepository extends IGenericRepository<Task> {
  abstract getByStatus(status: TaskStatus): Promise<Task[]>;
}
