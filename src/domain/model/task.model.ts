export enum TaskStatus {
  NOT_DONE = 'NOT_DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface TaskProps {
  id?: string;
  detail: string;
  status: TaskStatus;
  created_at?: Date;
  updated_at?: Date;
}

export class Task {
  readonly id?: string;
  readonly detail: string;
  readonly status: TaskStatus;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: TaskProps) {
    this.id = props.id;
    this.detail = props.detail;
    this.status = props.status;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(
    props: Omit<TaskProps, 'created_at' | 'updated_at' | 'id'>,
  ): Task {
    return new Task({
      ...props,
    });
  }

  static update(task: Task, props: Partial<Pick<TaskProps, 'detail'>>): Task {
    return new Task({
      id: task.id,
      detail: props.detail ?? task.detail,
      status: task.status,
      created_at: task.created_at,
      updated_at: new Date(),
    });
  }
  static markInProgress(task: Task): Task {
    return new Task({
      id: task.id,
      detail: task.detail,
      status: TaskStatus.IN_PROGRESS,
      created_at: task.created_at,
      updated_at: new Date(),
    });
  }
  static markDone(task: Task): Task {
    return new Task({
      id: task.id,
      detail: task.detail,
      status: TaskStatus.DONE,
      created_at: task.created_at,
      updated_at: new Date(),
    });
  }
  static reconstitute(props: Required<TaskProps>): Task {
    return new Task(props);
  }
}
