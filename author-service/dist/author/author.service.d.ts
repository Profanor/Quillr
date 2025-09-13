import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma.service';
export declare class AuthorService {
    private prisma;
    constructor(prisma: PrismaService);
    createAuthor(createAuthorDto: CreateAuthorDto): Promise<{
        id: any;
        name: any;
        email: any;
        createdAt: any;
    }>;
    getAuthor(data: {
        id: string;
    }): Promise<{
        id: any;
        name: any;
        email: any;
        createdAt: any;
    }>;
    updateAuthor(updateAuthorDto: UpdateAuthorDto): Promise<{
        id: any;
        name: any;
        email: any;
        createdAt: any;
    }>;
    deleteAuthor(data: {
        id: string;
    }): Promise<{
        message: string;
    }>;
    listAuthors(): Promise<{
        authors: any;
    }>;
}
