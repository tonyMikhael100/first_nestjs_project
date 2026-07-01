import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {




  const app = await NestFactory.create(AppModule);


  //Registers pipes as global pipes (will be used within every HTTP route handler)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(process.env.PORT ?? 8000);





}
bootstrap();
