import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { Public } from '../../../common/decorators/is-public.decorator';
import { ZodPipe } from '../../../common/pipes/zod-validation.pipe';
import {
  CreateUserDto,
  CreateUserSchema,
  IdParamUuidDto,
  IdParamUuidSchema,
  ReadUsersDto,
  ReadUsersSchema,
} from '@presentation/shared';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body(new ZodPipe(CreateUserSchema)) body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Public()
  @Get(':id')
  async findById(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
  ) {
    return await this.usersService.getUserById(params.id);
  }

  @Public()
  @Get()
  async find(@Query(new ZodPipe(ReadUsersSchema)) query: ReadUsersDto) {
    return await this.usersService.find(query);
  }
}
