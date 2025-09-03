import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {CreateCardDto, GenericResponseOf, ResponseCardSchema} from '@presentation/shared';
import {IS_PRIVATE} from '../../context/http.context';

@Injectable({
  providedIn: 'root',
})
export class CardsApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/cards';

  createCard(card: CreateCardDto) {
    return this.http.post<GenericResponseOf<typeof ResponseCardSchema>>(`${this.baseUrl}`, card, {
      context: new HttpContext().set(IS_PRIVATE, true),
    });
  }

  getCardsByUserId(userId: string) {
    return this.http.get<GenericResponseOf<typeof ResponseCardSchema>>(`${this.baseUrl}/${userId}`);
  }

  deleteCard(cardId: string) {
    return this.http.delete<GenericResponseOf<typeof ResponseCardSchema>>(`${this.baseUrl}/${cardId}`, {
      context: new HttpContext().set(IS_PRIVATE, true),
    });
  }

  updateCard(cardId: string, card: CreateCardDto) {
    return this.http.patch<GenericResponseOf<typeof ResponseCardSchema>>(`${this.baseUrl}/${cardId}`, card, {
      context: new HttpContext().set(IS_PRIVATE, true),
    });
  }

  screenshotCard(userId: string) {
    return this.http.get(`${this.baseUrl}/screenshot`, {
      responseType: 'blob',
      context: new HttpContext().set(IS_PRIVATE, true),
    });
  }

}


