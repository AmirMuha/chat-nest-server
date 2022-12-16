import * as path from 'path';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(process.cwd(), 'public'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useWebSocketAdapter(new WsAdapter(app));

  // await app.get(MikroORM).getMigrator().up();
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  const PORT = process.env.PORT;
  await app.listen(PORT).then(() => console.log('server is running on port ' + PORT));
}
bootstrap();
