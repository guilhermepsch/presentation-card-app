import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {
  CreateCardDto,
  CreateCardSchema, IdParamUuidSchema,
  ResponseCardDto,
} from '@presentation/shared';
import {CardsApiService} from './api/cards-api.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private cardsApi = inject(CardsApiService);

  async create(card: CreateCardDto): Promise<ResponseCardDto> {
    await CreateCardSchema.parseAsync(card);

    const response = await firstValueFrom(this.cardsApi.createCard(card));
    return response.data;
  }

  async findByUserId(userId: string): Promise<ResponseCardDto> {
    await IdParamUuidSchema.parseAsync({id: userId});
    const response = await firstValueFrom(this.cardsApi.getCardsByUserId(userId));
    return response.data;
  }

  async update(cardId: string, card: CreateCardDto): Promise<ResponseCardDto> {
    await CreateCardSchema.parseAsync(card);

    const response = await firstValueFrom(this.cardsApi.updateCard(cardId, card));
    return response.data;
  }

  async delete(cardId: string): Promise<ResponseCardDto> {
    await IdParamUuidSchema.parseAsync({id: cardId});
    const response = await firstValueFrom(this.cardsApi.deleteCard(cardId));
    return response.data;
  }

  async downloadScreenshot(userId: string) {
    const blob = await firstValueFrom(this.cardsApi.screenshotCard(userId));

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `screenshot_${userId}.png`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
