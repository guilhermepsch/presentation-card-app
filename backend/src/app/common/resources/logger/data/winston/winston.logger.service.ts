import { createLogger, format, transports, Logger } from 'winston';
import { Injectable } from '@nestjs/common';
import { ILoggerService } from '../../domain/logger.service.interface';

@Injectable()
export class WinstonLoggerService implements ILoggerService {
  constructor(private readonly logger: Logger) {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(
          ({ level, message, timestamp }) =>
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `[${timestamp}] ${level}: ${message}`,
        ),
      ),
      transports: [new transports.Console()],
    });
  }

  info(message: string, meta?: never) {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: never) {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: never) {
    this.logger.error(message, meta);
  }

  debug(message: string, meta?: never) {
    this.logger.debug(message, meta);
  }
}
