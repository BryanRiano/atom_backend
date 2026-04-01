import type { TaskRepositoryPort } from '../ports/task-repository.port';
import type { Task } from '../../domain/task.entity';

export class ListTasksUseCase {
  constructor(private readonly tasks: TaskRepositoryPort) {}

  execute(userId: string): Promise<Task[]> {
    return this.tasks.findByUserIdOrdered(userId);
  }
}
