import { LoginUserUseCase } from './login-user.use-case';
import { NotFoundError } from '../../domain/errors';
import type { UserRepositoryPort } from '../ports/user-repository.port';
import type { TokenServicePort } from '../ports/token-service.port';

describe('LoginUserUseCase', () => {
  it('returns token for existing user', async () => {
    const user = {
      id: 'u1',
      email: 'a@b.com',
      createdAt: new Date(),
    };
    const users: UserRepositoryPort = {
      findByEmail: jest.fn().mockResolvedValue(user),
      findById: jest.fn(),
      create: jest.fn(),
    };
    const tokens: TokenServicePort = {
      sign: jest.fn().mockReturnValue('jwt'),
      verify: jest.fn(),
    };
    const uc = new LoginUserUseCase(users, tokens);
    const result = await uc.execute('a@b.com');
    expect(result.accessToken).toBe('jwt');
  });

  it('throws when user missing', async () => {
    const users: UserRepositoryPort = {
      findByEmail: jest.fn().mockResolvedValue(null),
      findById: jest.fn(),
      create: jest.fn(),
    };
    const tokens: TokenServicePort = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    const uc = new LoginUserUseCase(users, tokens);
    await expect(uc.execute('x@y.com')).rejects.toBeInstanceOf(NotFoundError);
  });
});
