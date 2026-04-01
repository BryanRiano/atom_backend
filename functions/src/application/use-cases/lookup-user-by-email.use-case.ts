import type { UserRepositoryPort } from '../ports/user-repository.port';
import type { User } from '../../domain/user.entity';

export class LookupUserByEmailUseCase {
  constructor(private readonly users: UserRepositoryPort) {}

  execute(email: string): Promise<User | null> {
    return this.users.findByEmail(email);
  }
}
