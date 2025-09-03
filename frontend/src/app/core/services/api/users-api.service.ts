import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateUserDto,
  GenericResponseOf,
  PaginatedResponseOf,
  ReadUsersDto,
  ResponseUserSchema
} from '@presentation/shared';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/users';

  createUser(
    payload: CreateUserDto
  ): Observable<GenericResponseOf<typeof ResponseUserSchema>> {
    return this.http.post<GenericResponseOf<typeof ResponseUserSchema>>(
      this.baseUrl,
      payload
    );
  }

  getUsers(query: ReadUsersDto): Observable<PaginatedResponseOf<typeof ResponseUserSchema>> {
    return this.http.get<PaginatedResponseOf<typeof ResponseUserSchema>>(this.baseUrl, {
      params: query,
    });
  }

  getUserById(
    id: string
  ): Observable<GenericResponseOf<typeof ResponseUserSchema>> {
    return this.http.get<GenericResponseOf<typeof ResponseUserSchema>>(
      `${this.baseUrl}/${id}`
    );
  }
}
