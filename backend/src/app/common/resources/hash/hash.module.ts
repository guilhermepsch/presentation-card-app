import { IHashServiceSymbol } from './domain/hash.service.interface';
import { Module } from '@nestjs/common';
import { BcryptHashService } from './data/bcrypt/bcrypt.hash.service';

@Module({
  providers: [
    {
      provide: IHashServiceSymbol,
      useClass: BcryptHashService,
    },
  ],
  exports: [IHashServiceSymbol],
})
export class HashModule {}
