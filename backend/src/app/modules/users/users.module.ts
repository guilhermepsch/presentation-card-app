import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmUserEntity } from './data/mikro-orm/mikro-orm.user.entity';
import { HashModule } from '../../common/resources/hash/hash.module';
import { UsersService } from './domain/users.service';
import { IUsersRepositoryToken } from './domain/users.repository.interface';
import { MikroOrmUsersRepository } from './data/mikro-orm/mikro-orm.users.repository';
import { UsersController } from './presentation/users.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MikroOrmUserEntity]), HashModule],
  providers: [
    UsersService,
    { provide: IUsersRepositoryToken, useClass: MikroOrmUsersRepository },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
