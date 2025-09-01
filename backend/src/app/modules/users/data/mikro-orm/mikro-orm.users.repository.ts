import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/user';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { IUsersRepository } from '../../domain/users.repository.interface';
import { ReadUsersDto } from '@presentation/shared';
import { MikroOrmUsersMapper } from './mikro-orm.users.mapper';

export class MikroOrmUsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(MikroOrmUserEntity)
    private readonly repo: EntityRepository<MikroOrmUserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = new MikroOrmUserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.secret = user.secret;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    await this.repo.insert(entity);
    return MikroOrmUsersMapper.toDomain(entity);
  }

  async findById(id: string): Promise<User | null> {
    const orm = await this.repo.findOne({ id });
    return orm ? MikroOrmUsersMapper.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const orm = await this.repo.findOne({ email });
    return orm ? MikroOrmUsersMapper.toDomain(orm) : null;
  }

  async find(query: ReadUsersDto): Promise<{ users: User[]; total: number }> {
    const filters: FilterQuery<MikroOrmUserEntity> = {};
    if (query.email) {
      filters.email = { $like: `%${query.email}%` };
    }

    const page = query.page;
    const limit = query.pageSize;
    const offset = (page - 1) * limit;

    const [users, total] = await this.repo.findAndCount(filters, {
      limit,
      offset,
    });
    return {
      users: users.map((user) => MikroOrmUsersMapper.toDomain(user)),
      total,
    };
  }

  async delete(id: string): Promise<void> {
    await this.repo.nativeDelete({ id });
  }
}
