import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ensures the configuration is available across all modules
      envFilePath: '.env',
    }),
    BookModule,
    // register the gRPC client for the AuthorService
    ClientsModule.register([
      {
        name: 'AUTHOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'author',
          protoPath: join(__dirname, 'proto/author.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService,PrismaService],
})
export class AppModule {}
