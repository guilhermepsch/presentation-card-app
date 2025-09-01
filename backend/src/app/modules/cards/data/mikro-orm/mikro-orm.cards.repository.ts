import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { MikroOrmCardEntity } from './mikro-orm.card.entity';
import { ICardsRepository } from '../../domain/cards.repository.interface';
import { Card } from '../../domain/card';
import { ReadCardsDto } from '@presentation/shared';
import { MikroOrmCardsMapper } from './mikro-orm.cards.mapper';
import { MikroOrmUserEntity } from '../../../users/data/mikro-orm/mikro-orm.user.entity';

export class MikroOrmCardsRepository implements ICardsRepository {
  constructor(
    @InjectRepository(MikroOrmCardEntity)
    private readonly repo: EntityRepository<MikroOrmCardEntity>,
  ) {}

  async save(card: Card): Promise<Card> {
    const entity = new MikroOrmCardEntity();
    entity.fullName = card.fullName;
    entity.title = card.title;
    entity.email = card.email;
    entity.socialMedia = card.socialMedia;
    entity.phoneNumber = card.phoneNumber;
    entity.description = card.description;
    entity.user = this.repo
      .getEntityManager()
      .getReference(MikroOrmUserEntity, card.userId);
    entity.createdAt = card.createdAt;
    entity.updatedAt = card.updatedAt;
    await this.repo.insert(entity);
    return MikroOrmCardsMapper.toDomain(entity);
  }

  async update(card: Card): Promise<Card> {
    const entity = (await this.repo.findOne({
      id: card.id,
    }))!;

    entity.fullName = card.fullName ?? entity.fullName;
    entity.title = card.title ?? entity.title;
    entity.email = card.email ?? entity.email;
    entity.socialMedia = card.socialMedia ?? entity.socialMedia;
    entity.phoneNumber = card.phoneNumber ?? entity.phoneNumber;
    entity.description = card.description ?? entity.description;
    entity.updatedAt = new Date();
    await this.repo.getEntityManager().flush();
    return MikroOrmCardsMapper.toDomain(entity);
  }

  async findBy(query: ReadCardsDto): Promise<{ cards: Card[]; total: number }> {
    const filters: FilterQuery<MikroOrmCardEntity> = {};

    if (query.fullName) {
      filters.fullName = { $like: `%${query.fullName}%` };
    }
    if (query.email) {
      filters.email = { $like: `%${query.email}%` };
    }
    if (query.title) {
      filters.title = { $like: `%${query.title}%` };
    }

    const page = query.page;
    const limit = query.pageSize;
    const offset = (page - 1) * limit;

    const [cards, total] = await this.repo.findAndCount(filters, {
      limit,
      offset,
    });
    return {
      cards: cards.map((card) => MikroOrmCardsMapper.toDomain(card)),
      total,
    };
  }

  async findById(id: string): Promise<Card | null> {
    const orm = await this.repo.findOne({ id });
    return orm ? MikroOrmCardsMapper.toDomain(orm) : null;
  }

  async findByUserId(id: string): Promise<Card | null> {
    const orm = await this.repo.findOne({ user: id });
    return orm ? MikroOrmCardsMapper.toDomain(orm) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.nativeDelete({ id });
  }
}
