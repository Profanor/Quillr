import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @GrpcMethod('BookService', 'createBook')
   create(@Payload() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  // gRPC method to get details of a single book
  @GrpcMethod('BookService', 'getBook')
   findOne(@Payload() data: { id: string }) {
    return this.bookService.getBook(data);
  }

  // gRPC method to list all books
  @GrpcMethod('BookService', 'listBooks')
  async listBooks() {
    return await this.bookService.listBooks();
  }

  // gRPC method to update a book
  @GrpcMethod('BookService', 'updateBook')
  async updateBook(updateBookDto: UpdateBookDto & { id: string }) {
    return await this.bookService.updateBook(updateBookDto);
  }

  // gRPC method to delete a book
  @GrpcMethod('BookService', 'deleteBook')
  async deleteBook(data: { id: string }) {
    return await this.bookService.deleteBook(data);
  }

  // gRPC method to retrieve books by a specific author
  @GrpcMethod('BookService', 'getBooksByAuthor')
  async getBooksByAuthor(data: { authorId: string }) {
    return await this.bookService.getBooksByAuthor(data);
  }
}
