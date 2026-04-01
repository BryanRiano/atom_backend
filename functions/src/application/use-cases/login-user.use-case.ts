import { NotFoundError } from '../../domain/errors';
import type { UserRepositoryPort } from '../ports/user-repository.port';
import type { TokenServicePort } from '../ports/token-service.port';

export class LoginUserUseCase {
  constructor(
    private readonly users: UserRepositoryPort,
    private readonly tokens: TokenServicePort
  ) {}

  async execute(email: string): Promise<{ accessToken: string }> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User');
    }
    const accessToken = this.tokens.sign({ sub: user.id, email: user.email });
    return { accessToken };
  }
}
