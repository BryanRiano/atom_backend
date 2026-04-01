import type { Task } from '../../domain/task.entity';

export interface CreateTaskInput {
  userId: string;
  title: string;
  description: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TaskRepositoryPort {
  findByUserIdOrdered(userId: string): Promise<Task[]>;
  create(input: CreateTaskInput): Promise<Task>;
  update(userId: string, taskId: string, input: UpdateTaskInput): Promise<Task | null>;
  delete(userId: string, taskId: string): Promise<boolean>;
}
