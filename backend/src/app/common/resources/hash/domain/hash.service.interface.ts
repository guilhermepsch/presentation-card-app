export const IHashServiceSymbol = Symbol('IHashService');

export interface IHashService {
  hash(password: string): Promise<string>;

  compare(password: string, hash: string): Promise<boolean>;
}
