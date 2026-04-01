import { getJwtSecret } from './env';
import { createUseCaseFactory, type UseCaseFactory } from '../../application/factories/use-case.factory';
import { FirestoreUserRepository } from '../persistence/firestore-user.repository';
import { FirestoreTaskRepository } from '../persistence/firestore-task.repository';
import { JwtTokenService } from '../security/jwt-token.service';
import type { TokenServicePort } from '../../application/ports/token-service.port';

let cached: { factory: UseCaseFactory; tokens: TokenServicePort } | null = null;

export function getWiring(): { factory: UseCaseFactory; tokens: TokenServicePort } {
  if (cached) return cached;
  const tokens = new JwtTokenService(getJwtSecret());
  const users = new FirestoreUserRepository();
  const tasks = new FirestoreTaskRepository();
  const factory = createUseCaseFactory(users, tasks, tokens);
  cached = { factory, tokens };
  return cached;
}
