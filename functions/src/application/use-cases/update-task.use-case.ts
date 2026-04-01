import { NotFoundError } from '../../domain/errors';
import type { TaskRepositoryPort, UpdateTaskInput } from '../ports/task-repository.port';
import type { Task } from '../../domain/task.entity';

export class UpdateTaskUseCase {
  constructor(private readonly tasks: TaskRepositoryPort) {}

  async execute(userId: string, taskId: string, input: UpdateTaskInput): Promise<Task> {
    const updated = await this.tasks.update(userId, taskId, input);
    if (!updated) {
      throw new NotFoundError('Task');
    }
    return updated;
  }
}
