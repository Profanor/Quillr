import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('test')
  async getAuthors() {
    return await this.authorService.getAuthors();
  }

  @MessagePattern('createAuthor')
  create(@Payload() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @MessagePattern('findAllAuthor')
  findAll() {
    return this.authorService.findAll();
  }

  @MessagePattern('findOneAuthor')
  findOne(@Payload() id: number) {
    return this.authorService.findOne(id);
  }

  @MessagePattern('updateAuthor')
  update(@Payload() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(updateAuthorDto.id, updateAuthorDto);
  }

  @MessagePattern('removeAuthor')
  remove(@Payload() id: number) {
    return this.authorService.remove(id);
  }
}
