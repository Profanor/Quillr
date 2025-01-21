import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    getAuthors(): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
    }[]>;
    create(createAuthorDto: CreateAuthorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateAuthorDto: UpdateAuthorDto): string;
    remove(id: number): string;
}
