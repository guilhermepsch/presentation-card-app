import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const isProduction = process.env.NODE_ENV === 'production';

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: 'presentation',
  host: process.env.DB_HOST || 'database',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',

  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
  },

  debug: !isProduction,
};

export default config;
