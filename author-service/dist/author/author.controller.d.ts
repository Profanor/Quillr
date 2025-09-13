import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    create(createAuthorDto: CreateAuthorDto): Promise<{
        id: any;
        name: any;
        email: any;
        createdAt: any;
    }>;
    findOne(data: {
        id: string;
    }): Promise<{
        id: any;
        name: any;
        email: any;
        createdAt: any;
    }>;
    update(updateAuthorDto: UpdateAuthorDto): Promise<{
        id: any;
        name: any;
        email: any;
        createdAt: any;
    }>;
    listAuthors(): Promise<{
        authors: any;
    }>;
    delete(data: {
        id: string;
    }): Promise<{
        message: string;
    }>;
}
