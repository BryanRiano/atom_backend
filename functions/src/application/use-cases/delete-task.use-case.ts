import { NotFoundError } from '../../domain/errors';
import type { TaskRepositoryPort } from '../ports/task-repository.port';

export class DeleteTaskUseCase {
  constructor(private readonly tasks: TaskRepositoryPort) {}

  async execute(userId: string, taskId: string): Promise<void> {
    const ok = await this.tasks.delete(userId, taskId);
    if (!ok) {
      throw new NotFoundError('Task');
    }
  }
}
