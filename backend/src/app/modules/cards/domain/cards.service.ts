import { Inject, UnprocessableEntityException } from '@nestjs/common';
import {
  ICardsRepository,
  ICardsRepositoryToken,
} from './cards.repository.interface';
import {
  CreateCardDto,
  ReadCardDto,
  UpdateCardDto,
} from '@presentation/shared';
import { Card } from './card';
import { v4 as uuid } from 'uuid';

export class CardsService {
  constructor(
    @Inject(ICardsRepositoryToken)
    private readonly repository: ICardsRepository,
  ) {}

  async createCard(card: CreateCardDto, userId: string): Promise<Card> {
    const existingCard = await this.repository.findByUserId(userId);
    if (existingCard) {
      throw new UnprocessableEntityException(
        'O usuário já possui um cartão de apresentação',
      );
    }
    const newCard = new Card(
      uuid(),
      card.fullName,
      card.title,
      card.email,
      card.socialMedia,
      card.phoneNumber || null,
      card.description || null,
      userId,
      new Date(),
      new Date(),
    );
    return this.repository.save(newCard);
  }

  async updateCard(
    card: UpdateCardDto,
    cardId: string,
    userId: string,
  ): Promise<Card> {
    const existingCard = await this.findCardById(cardId);
    if (!existingCard) {
      throw new UnprocessableEntityException(
        'Cartão de apresentação não encontrado',
      );
    }
    if (existingCard.userId !== userId) {
      throw new UnprocessableEntityException(
        'Você não tem permissão para atualizar este cartão',
      );
    }

    const updatedCard = new Card(
      existingCard.id,
      card.fullName || existingCard.fullName,
      card.title || existingCard.title,
      card.email || existingCard.email,
      card.socialMedia || existingCard.socialMedia,
      card.phoneNumber || existingCard.phoneNumber,
      card.description || existingCard.description,
      existingCard.userId,
      existingCard.createdAt,
      new Date(),
    );

    return this.repository.update(updatedCard);
  }

  async deleteCard(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async findCards(
    query: ReadCardDto,
  ): Promise<{ cards: Card[]; total: number }> {
    return this.repository.findBy(query);
  }

  async findCardById(id: string): Promise<Card | null> {
    return this.repository.findById(id);
  }

  async findByUserId(id: string): Promise<Card | null> {
    return this.repository.findByUserId(id);
  }
}
