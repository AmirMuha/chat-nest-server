import * as path from 'path';
import * as cors from 'cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { NextFunction, Response, Request } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

export const storage = new AsyncLocalStorage<EntityManager>();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(process.cwd(), 'public'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.use(
    cors({
      origin: '*',
    }),
  );
  const orm = app.get(MikroORM);
  await orm.getMigrator().up();
  await orm.getSchemaGenerator().ensureDatabase();
  await orm.getSchemaGenerator().updateSchema();
  app.use((req: Request, res: Response, next: NextFunction) => {
    storage.run(orm.em.fork(), next, undefined);
  });

  const PORT = process.env.PORT;
  await app.listen(PORT).then(() => console.log('server is running on port ' + PORT));
}
bootstrap();
