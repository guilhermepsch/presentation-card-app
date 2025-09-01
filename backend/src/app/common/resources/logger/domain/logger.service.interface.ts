export const ILoggerService = Symbol('IUserRepository');

export interface ILoggerService {
  info(message: string, meta?: never): void;

  error(message: string, meta?: never): void;

  warn(message: string, meta?: never): void;

  debug(message: string, meta?: never): void;
}
