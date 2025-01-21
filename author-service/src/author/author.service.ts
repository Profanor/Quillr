import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma.service';
import { GrpcMethod } from '@nestjs/microservices';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  // createAuthor method
  @GrpcMethod('AuthorService', 'createAuthor')
  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const { name, email } = createAuthorDto;

    // use Prisma to create the author in the database
    const createdAuthor = await this.prisma.author.create({
      data: {
        name,
        email,
      },
    });

    // return the AuthorResponse as a DTO for gRPC
    return {
      id: createdAuthor.id,
      name: createdAuthor.name,
      email: createdAuthor.email,
      createdAt: createdAuthor.createdAt.toISOString(),
    };
  }

  // getAuthor method
  @GrpcMethod('AuthorService', 'getAuthor')
  async getAuthor(data: { id: string }) {
    const { id } = data;
    const author = await this.prisma.author.findUnique({ where: { id } });

    if (!author) {
      throw new Error('Author not found');
    }

    return {
      id: author.id,
      name: author.name,
      email: author.email,
      createdAt: author.createdAt.toISOString(),
    };
  }

  // updateAuthor method
  @GrpcMethod('AuthorService', 'updateAuthor')
  async updateAuthor( updateAuthorDto: UpdateAuthorDto ) {
    const { id, name, email } = updateAuthorDto;

    const existingAuthor = await this.prisma.author.findUnique({
    where: { id },
  });

    if (!existingAuthor) {
      throw new Error('Author not found');
    }

    const updatedAuthor = await this.prisma.author.update({
      where: { id },
      data: { name, email },
    });

    return {
      id: updatedAuthor.id,
      name: updatedAuthor.name,
      email: updatedAuthor.email,
      createdAt: updatedAuthor.createdAt.toISOString(),
    };
  }

  // deleteAuthor method
  @GrpcMethod('AuthorService', 'deleteAuthor')
  async deleteAuthor(data: { id: string }) {
    const { id } = data;

    // check if author exists before attempting deletion
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) {
      throw new Error('Author not found');
    }

     await this.prisma.author.delete({
      where: { id },
    });

    return { message: 'Author deleted successfully' };
  }

  // listAuthors method
  @GrpcMethod('AuthorService', 'listAuthors')
  async listAuthors() {
    const authors = await this.prisma.author.findMany();

    return {
      authors: authors.map(author => ({
        id: author.id,
        name: author.name,
        email: author.email,
        createdAt: author.createdAt.toISOString(),
      })),
    };
  }
}
