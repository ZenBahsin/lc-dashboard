import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
