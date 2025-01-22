import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// gRPC Interface for AuthorService
interface AuthorServiceClient {
  getAuthor(data: { id: string }): Observable<{ id: string; name: string; email: string; createdAt: string }>;
}

@Injectable()
export class BookService {
  private authorClient: AuthorServiceClient;

  constructor(
    private prisma: PrismaService,
    @Inject('AUTHOR_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    // initialize the AuthorService client
    this.authorClient = this.client.getService<AuthorServiceClient>('AuthorService');
  }

  // create a new book
  @GrpcMethod('BookService', 'createBook')
  async createBook(createBookDto: CreateBookDto) {
    console.log('createBook called with:', createBookDto);
    
    const { title, authorId, publishedYear } = createBookDto;

    // check if the author exists via AuthorService
    let author;
    try {
      author = await lastValueFrom(this.authorClient.getAuthor({ id: authorId }));
    } catch {
      throw new Error(`Author with ID ${authorId} not found`);
    }

    // proceed to create the book
    const createdBook = await this.prisma.book.create({
      data: {
        title,
        authorId,
        publishedYear,
      },
    });

    return {
      id: createdBook.id,
      title: createdBook.title,
      authorId: createdBook.authorId,
      publishedYear: createdBook.publishedYear,
      createdAt: createdBook.createdAt.toISOString(),
    };
  }


  // get details of a single book
  @GrpcMethod('BookService', 'getBook')
  async getBook(data: { id: string }) {
    const { id } = data;
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new Error(`Book with ID ${data.id} not found`);
    } 

    return {
      id: book.id,
      title: book.title,
      authorId: book.authorId,
      publishedYear: book.publishedYear,
      createdAt: book.createdAt.toISOString(),
    };
  }

  // update book
  @GrpcMethod('BookService', 'updateBook')
  async updateBook( updateBookDto: UpdateBookDto & { id: string } ) {
    const { id, title, publishedYear } = updateBookDto;

    const existingBook = await this.prisma.book.findUnique({
    where: { id },
  });

    if (!existingBook) {
      throw new Error('Book not found');
    };

    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: { title, publishedYear },
    });

    return {
      id: updatedBook.id,
      title: updatedBook.title,
      authorId: updatedBook.authorId,
      publishedYear: updatedBook.publishedYear,
      createdAt: updatedBook.createdAt.toISOString(),
    };
  }

  // delete book
  @GrpcMethod('BookService', 'deleteBook')
  async deleteBook(data: { id: string }) {
    const { id } = data;

    // check if book exists before attempting deletion
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new Error('Book not found');
    }
     await this.prisma.book.delete({ 
      where: { id } 
    });

    return { message: 'Book deleted successfully' };
  }


  // list all books
  @GrpcMethod('BookService', 'listBooks')
  async listBooks() {
    const books = await this.prisma.book.findMany();

    return {
      books: books.map((book) => ({
        id: book.id,
        title: book.title,
        authorId: book.authorId,
        publishedYear: book.publishedYear,
        createdAt: book.createdAt.toISOString(),
      })),
    };
  }

  // get books by a specific author
  @GrpcMethod('BookService', 'getBooksByAuthor')
  async getBooksByAuthor(data: { authorId: string }) {
    // Validate that the author exists
    let author;
    try {
      author = await lastValueFrom(this.authorClient.getAuthor({ id: data.authorId }));
    } catch {
      throw new Error(`Author with ID ${data.authorId} not found`);
    }

    // fetch books for the given author
    const books = await this.prisma.book.findMany({ where: { authorId: data.authorId } });

    return {
      author: {
        id: author.id,
        name: author.name,
      },
      books: books.map((book) => ({
        id: book.id,
        title: book.title,
        authorId: book.authorId,
        publishedYear: book.publishedYear,
        createdAt: book.createdAt.toISOString(),
      })),
    };
  }
}
