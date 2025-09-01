import { User } from './user';
import { ReadUsersDto } from '@presentation/shared';

export const IUsersRepositoryToken = Symbol('IUserRepository');

export interface IUsersRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  find(query: ReadUsersDto): Promise<{ users: User[]; total: number }>;
  delete(id: string): Promise<void>;
}
