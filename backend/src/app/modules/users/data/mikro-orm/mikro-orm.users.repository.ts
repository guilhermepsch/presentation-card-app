import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/user';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { IUsersRepository } from '../../domain/users.repository.interface';
import { ReadUsersDto } from '@presentation/shared';

export class MikroOrmUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(MikroOrmUserEntity)
    private readonly repo: EntityRepository<MikroOrmUserEntity>,
  ) {}

  save(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByCpf(cpf: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  find(query: ReadUsersDto): Promise<{ users: User[]; total: number }> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
