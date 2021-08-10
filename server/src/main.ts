import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs BiliBili')
    .setDescription('The Nestjs API description')
    .setVersion('1.0')
    .addTag('Nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  app.useLogger(app.get(Log4jsLogger));

  await app.listen(3000);
  console.log('http://localhost:3000/api-docs');
}
bootstrap();
