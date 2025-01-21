import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    create(createAuthorDto: CreateAuthorDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
    findOne(data: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
    update(updateAuthorDto: UpdateAuthorDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
    listAuthors(): Promise<{
        authors: {
            id: string;
            name: string;
            email: string;
            createdAt: string;
        }[];
    }>;
    delete(data: {
        id: string;
    }): Promise<{
        message: string;
    }>;
}
