import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmCardsRepository } from './data/mikro-orm/mikro-orm.cards.repository';
import { MikroOrmCardEntity } from './data/mikro-orm/mikro-orm.card.entity';
import { CardsService } from './domain/cards.service';
import { ICardsRepositoryToken } from './domain/cards.repository.interface';
import { CardsController } from './presentation/cards.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MikroOrmCardEntity])],
  providers: [
    CardsService,
    { provide: ICardsRepositoryToken, useClass: MikroOrmCardsRepository },
  ],
  controllers: [CardsController],
  exports: [CardsService],
})
export class CardsModule {}
