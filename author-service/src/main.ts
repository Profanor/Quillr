import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'author',
      protoPath: join(__dirname, 'proto/author.proto'), 
      url: 'localhost:50051',
    },
  });
  await app.listen();
}

bootstrap();
