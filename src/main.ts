import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API NestJS Steam')
    .setDescription('CRUD API com NestJS')
    .setVersion('1.0')
    .build();

  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('API', app, doc);
  await app.listen(3000);
}
bootstrap();
