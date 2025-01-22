import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
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
      onLoadPackageDefinition: (pkg, server) => { // used to add reflection service to the server
      new ReflectionService(pkg).addToServer(server);
    },
    },
  });
  await app.listen();
}

bootstrap();
