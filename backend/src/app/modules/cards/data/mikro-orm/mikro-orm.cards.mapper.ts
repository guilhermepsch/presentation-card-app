import { Card } from '../../domain/card';
import { MikroOrmCardEntity } from './mikro-orm.card.entity';

export class MikroOrmCardsMapper {
  static toDomain(entity: MikroOrmCardEntity): Card {
    return new Card(
      entity.id,
      entity.fullName,
      entity.title,
      entity.email,
      entity.socialMedia,
      entity.phoneNumber,
      entity.description,
      entity.user.id,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
