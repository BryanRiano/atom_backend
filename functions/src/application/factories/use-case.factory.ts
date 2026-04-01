import type { UserRepositoryPort } from '../ports/user-repository.port';
import type { TaskRepositoryPort } from '../ports/task-repository.port';
import type { TokenServicePort } from '../ports/token-service.port';
import { LookupUserByEmailUseCase } from '../use-cases/lookup-user-by-email.use-case';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { LoginUserUseCase } from '../use-cases/login-user.use-case';
import { ListTasksUseCase } from '../use-cases/list-tasks.use-case';
import { CreateTaskUseCase } from '../use-cases/create-task.use-case';
import { UpdateTaskUseCase } from '../use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../use-cases/delete-task.use-case';

export interface UseCaseFactory {
  lookupUserByEmail: LookupUserByEmailUseCase;
  createUser: CreateUserUseCase;
  loginUser: LoginUserUseCase;
  listTasks: ListTasksUseCase;
  createTask: CreateTaskUseCase;
  updateTask: UpdateTaskUseCase;
  deleteTask: DeleteTaskUseCase;
}

export function createUseCaseFactory(
  users: UserRepositoryPort,
  tasks: TaskRepositoryPort,
  tokens: TokenServicePort
): UseCaseFactory {
  return {
    lookupUserByEmail: new LookupUserByEmailUseCase(users),
    createUser: new CreateUserUseCase(users, tokens),
    loginUser: new LoginUserUseCase(users, tokens),
    listTasks: new ListTasksUseCase(tasks),
    createTask: new CreateTaskUseCase(tasks),
    updateTask: new UpdateTaskUseCase(tasks),
    deleteTask: new DeleteTaskUseCase(tasks),
  };
}
