import {
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ICardsRepository,
  ICardsRepositoryToken,
} from './cards.repository.interface';
import {
  CreateCardDto,
  ReadCardsDto,
  UpdateCardDto,
} from '@presentation/shared';
import { Card } from './card';
import { v4 as uuid } from 'uuid';
import {
  IScreenshotService,
  IScreenshotServiceToken,
} from '../../../common/resources/screenshot/domain/screenshot.service.interface';

export class CardsService {
  constructor(
    @Inject(ICardsRepositoryToken)
    private readonly repository: ICardsRepository,
    @Inject(IScreenshotServiceToken)
    private readonly screenshotService: IScreenshotService,
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

  async deleteCard(id: string, userId: string): Promise<void> {
    const existingCard = await this.findCardById(id);
    if (!existingCard) {
      throw new UnprocessableEntityException(
        'Cartão de apresentação não encontrado',
      );
    }
    if (existingCard.userId !== userId) {
      throw new UnprocessableEntityException(
        'Você não tem permissão para deletar este cartão',
      );
    }
    return this.repository.delete(id);
  }

  async findCards(
    query: ReadCardsDto,
  ): Promise<{ cards: Card[]; total: number }> {
    return this.repository.findBy(query);
  }

  async findCardById(id: string): Promise<Card | null> {
    return this.repository.findById(id);
  }

  async findByUserId(id: string): Promise<Card | null> {
    return this.repository.findByUserId(id);
  }

  async generateScreenshot(id: string) {
    const card = await this.findByUserId(id);
    if (!card) {
      throw new NotFoundException('Cartão de apresentação não encontrado');
    }
    return await this.screenshotService.generateScreenshot(
      `http://frontend:4200/presentation/${card.id}`,
    );
  }
}
