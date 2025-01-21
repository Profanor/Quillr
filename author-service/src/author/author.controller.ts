import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // createAuthor method
  @GrpcMethod('AuthorService', 'createAuthor')
  create(@Payload() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  // getAuthor method
  @GrpcMethod('AuthorService', 'getAuthor')
  findOne(@Payload() data: { id: string }) {
    return this.authorService.getAuthor(data);
  }

  // updateAuthor method
  @GrpcMethod('AuthorService', 'updateAuthor')
  update(@Payload() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.updateAuthor(updateAuthorDto);
  }

  // listAuthors method
  @GrpcMethod('AuthorService', 'listAuthors')
  async listAuthors() {
    return await this.authorService.listAuthors();
  }

  // deleteAuthor method
  @GrpcMethod('AuthorService', 'deleteAuthor')
  async delete(@Payload() data: { id: string }) {
    return this.authorService.deleteAuthor(data);
  }
}
