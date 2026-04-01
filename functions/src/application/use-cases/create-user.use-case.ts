import { ConflictError } from '../../domain/errors';
import type { UserRepositoryPort } from '../ports/user-repository.port';
import type { TokenServicePort } from '../ports/token-service.port';
import type { User } from '../../domain/user.entity';

export interface CreateUserResult {
  user: User;
  accessToken: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly users: UserRepositoryPort,
    private readonly tokens: TokenServicePort
  ) {}

  async execute(email: string): Promise<CreateUserResult> {
    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }
    const user = await this.users.create(email);
    const accessToken = this.tokens.sign({ sub: user.id, email: user.email });
    return { user, accessToken };
  }
}
