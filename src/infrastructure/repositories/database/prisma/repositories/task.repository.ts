import { TaskRepository } from '@domain/repositories/database/task.repository';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Task } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaTaskMapper } from '../mapper/task.mapper';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class PrismaTaskRepository
  extends PrismaRepository
  implements TaskRepository
{
  getByStatus(status: TaskStatus): Promise<Task[]> {
    return this.getConnection(null)
      .task.findMany({
        where: { status },
      })
      .then((data) => data.map(PrismaTaskMapper.toDomain));
  }
  getAll(tx?: PrismaTransaction): Promise<Task[]> {
    return this.getConnection(null)
      .task.findMany()
      .then((data) => data.map(PrismaTaskMapper.toDomain));
  }
  getById(id: string, tx?: PrismaTransaction): Promise<Task> {
    return this.getConnection(tx)
      .task.findUnique({
        where: { id },
      })
      .then(PrismaTaskMapper.toDomain);
  }
  create(entity: Task, tx?: PrismaTransaction): Promise<Task> {
    return this.getConnection(tx)
      .task.create({ data: PrismaTaskMapper.toPrisma(entity) })
      .then(PrismaTaskMapper.toDomain);
  }
  createMany(
    entities: Task[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    throw new Error('Method not implemented.');
  }
  update(entity: Task, tx?: PrismaTransaction): Promise<Task> {
    return this.getConnection(tx)
      .task.update({
        where: { id: entity.id },
        data: PrismaTaskMapper.toPrisma(entity),
      })
      .then(PrismaTaskMapper.toDomain);
  }
  remove(id: string, tx?: PrismaTransaction): Promise<Task> {
    return this.getConnection(tx)
      .task.delete({
        where: { id },
      })
      .then(PrismaTaskMapper.toDomain);
  }
}
