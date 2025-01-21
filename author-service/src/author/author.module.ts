import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaService } from '../prisma.service';
import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService, PrismaService],
})
export class AuthorModule {}
