import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    // register gRPC Client for AuthorService
    ClientsModule.register([
      {
        name: 'AUTHOR_PACKAGE', // match the injection token in the service
        transport: Transport.GRPC,
        options: {
          package: 'author', // match the package name from the author's `.proto` file
          protoPath: join(__dirname, '../proto/author.proto'),
        },
      },
    ]),
  ],
  providers: [BookService, PrismaService],
})
export class BookModule {}
