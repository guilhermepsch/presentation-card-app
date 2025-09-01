import { Card } from './card';
import { ReadCardsDto } from '@presentation/shared';

export const ICardsRepositoryToken = Symbol('ICardRepository');

export interface ICardsRepository {
  save(card: Card): Promise<Card>;
  update(card: Card): Promise<Card>;
  findBy(query: ReadCardsDto): Promise<{ cards: Card[]; total: number }>;
  findById(id: string): Promise<Card | null>;
  findByUserId(id: string): Promise<Card | null>;
  delete(id: string): Promise<void>;
}
