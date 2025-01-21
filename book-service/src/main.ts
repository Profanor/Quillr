import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'book', 
      protoPath: join(__dirname, 'proto/book.proto'), 
      url: 'localhost:50052',
    },
  });
  await app.listen();
}

bootstrap();
