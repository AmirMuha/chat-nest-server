import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
} = process.env;

export default {
  metadataProvider: TsMorphMetadataProvider,
  logger: (message) => Logger.log(message),
  debug: true,
  highlighter: new SqlHighlighter(),
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.ts'],
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  password: POSTGRES_PASSWORD,
  dbName: POSTGRES_DB,
  type: 'postgresql',
  autoLoadEntities: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pathTs: './migrations',
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: true,
    snapshot: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
} as MikroOrmModuleSyncOptions;
