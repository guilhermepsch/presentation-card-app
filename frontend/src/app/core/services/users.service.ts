import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsersApiService } from './api/users-api.service';
import {
  CreateUserDto,
  CreateUserSchema, IdParamUuidDto, IdParamUuidSchema,
  PaginatedResponseOf,
  ReadUsersDto, ReadUsersSchema,
  ResponseUserDto, ResponseUserSchema
} from '@presentation/shared';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersApi = inject(UsersApiService);

  async create(payload: CreateUserDto): Promise<ResponseUserDto> {
    await CreateUserSchema.parseAsync(payload);
    const response = await firstValueFrom(this.usersApi.createUser(payload));
    return response.data;
  }

  async findAll(
    query: ReadUsersDto
  ): Promise<PaginatedResponseOf<typeof ResponseUserSchema>> {
    await ReadUsersSchema.parseAsync(query);
    return await firstValueFrom(this.usersApi.getUsers(query));
  }

  async findById(params: IdParamUuidDto): Promise<ResponseUserDto> {
    await IdParamUuidSchema.parseAsync(params);
    const response = await firstValueFrom(this.usersApi.getUserById(params.id));
    return response.data;
  }
}
