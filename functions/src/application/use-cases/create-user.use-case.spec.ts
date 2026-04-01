import { CreateUserUseCase } from './create-user.use-case';
import { ConflictError } from '../../domain/errors';
import type { UserRepositoryPort } from '../ports/user-repository.port';
import type { TokenServicePort } from '../ports/token-service.port';

describe('CreateUserUseCase', () => {
  it('creates user and returns token', async () => {
    const user = {
      id: 'u1',
      email: 'a@b.com',
      createdAt: new Date(),
    };
    const users: UserRepositoryPort = {
      findByEmail: jest.fn().mockResolvedValue(null),
      findById: jest.fn(),
      create: jest.fn().mockResolvedValue(user),
    };
    const tokens: TokenServicePort = {
      sign: jest.fn().mockReturnValue('jwt-token'),
      verify: jest.fn(),
    };
    const uc = new CreateUserUseCase(users, tokens);
    const result = await uc.execute('a@b.com');
    expect(result.user).toEqual(user);
    expect(result.accessToken).toBe('jwt-token');
    expect(tokens.sign).toHaveBeenCalledWith({ sub: 'u1', email: 'a@b.com' });
  });

  it('throws when email exists', async () => {
    const users: UserRepositoryPort = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 'x',
        email: 'a@b.com',
        createdAt: new Date(),
      }),
      findById: jest.fn(),
      create: jest.fn(),
    };
    const tokens: TokenServicePort = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    const uc = new CreateUserUseCase(users, tokens);
    await expect(uc.execute('a@b.com')).rejects.toBeInstanceOf(ConflictError);
  });
});
