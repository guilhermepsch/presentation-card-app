import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './data/winston/winston.logger.service';
import { ILoggerServiceToken } from './domain/logger.service.interface';

@Module({
  providers: [
    {
      provide: ILoggerServiceToken,
      useClass: WinstonLoggerService,
    },
  ],
  imports: [],
  exports: [ILoggerServiceToken],
})
export class LoggerModule {}
