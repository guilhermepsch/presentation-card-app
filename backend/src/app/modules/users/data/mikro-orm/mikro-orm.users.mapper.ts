import { User } from '../../domain/user';
import { MikroOrmUserEntity } from './mikro-orm.user.entity';

export class MikroOrmUsersMapper {
  static toDomain(entity: MikroOrmUserEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.secret,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
