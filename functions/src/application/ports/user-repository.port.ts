import type { User } from '../../domain/user.entity';

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(email: string): Promise<User>;
}
