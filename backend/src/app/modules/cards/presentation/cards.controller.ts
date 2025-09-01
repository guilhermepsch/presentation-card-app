import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CardsService } from '../domain/cards.service';
import { Public } from '../../../common/decorators/is-public.decorator';
import { ZodPipe } from '../../../common/pipes/zod-validation.pipe';
import {
  CreateCardDto,
  CreateCardSchema,
  IdParamUuidDto,
  IdParamUuidSchema,
  ReadCardsDto,
  ReadCardsSchema,
  UpdateCardDto,
  UpdateCardSchema,
} from '@presentation/shared';
import { RequestWithUser } from '../../../common/guards/auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateCardSchema)) body: CreateCardDto,
    @Request() req: RequestWithUser,
  ) {
    return await this.cardsService.createCard(body, req.user.sub);
  }

  @Public()
  @Get(':id')
  async findById(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
  ) {
    return await this.cardsService.findCardById(params.id);
  }

  @Public()
  @Get()
  async find(@Query(new ZodPipe(ReadCardsSchema)) query: ReadCardsDto) {
    return await this.cardsService.findCards(query);
  }

  @Patch(':id')
  async update(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
    @Body(new ZodPipe(UpdateCardSchema)) body: UpdateCardDto,
    @Request() req: RequestWithUser,
  ) {
    return await this.cardsService.updateCard(body, params.id, req.user.sub);
  }

  @Delete(':id')
  async delete(
    @Param(new ZodPipe(IdParamUuidSchema)) params: IdParamUuidDto,
    @Request() req: RequestWithUser,
  ) {
    return await this.cardsService.deleteCard(params.id, req.user.sub);
  }
}
