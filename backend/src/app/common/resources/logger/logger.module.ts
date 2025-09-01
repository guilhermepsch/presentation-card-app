import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './data/winston/winston.logger.service';
import { ILoggerService } from './domain/logger.service.interface';

@Module({
  providers: [
    {
      provide: ILoggerService,
      useClass: WinstonLoggerService,
    },
  ],
  imports: [],
  exports: [ILoggerService],
})
export class LoggerModule {}
