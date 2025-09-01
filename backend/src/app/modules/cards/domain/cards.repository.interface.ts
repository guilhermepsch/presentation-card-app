import { Card } from './card';
import { ReadCardDto } from '@presentation/shared';

export const ICardsRepositoryToken = Symbol('ICardRepository');

export interface ICardsRepository {
  save(card: Card): Promise<Card>;
  update(card: Card): Promise<Card>;
  findBy(query: ReadCardDto): Promise<{ cards: Card[]; total: number }>;
  findById(id: string): Promise<Card | null>;
  findByUserId(id: string): Promise<Card | null>;
  delete(id: string): Promise<void>;
}
