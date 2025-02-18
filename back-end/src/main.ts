import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your Next.js frontend URL
    methods: 'GET,POST,PUT,DELETE', // Allow methods as needed
    allowedHeaders: 'Content-Type, Authorization', // Allow headers as needed
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
