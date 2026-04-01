import type { TaskRepositoryPort } from '../ports/task-repository.port';
import type { Task } from '../../domain/task.entity';

export class CreateTaskUseCase {
  constructor(private readonly tasks: TaskRepositoryPort) {}

  execute(userId: string, title: string, description: string): Promise<Task> {
    return this.tasks.create({ userId, title, description });
  }
}
