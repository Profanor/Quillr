import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma.service';
export declare class AuthorService {
    private prisma;
    constructor(prisma: PrismaService);
    createAuthor(createAuthorDto: CreateAuthorDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
    getAuthor(data: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
    updateAuthor(updateAuthorDto: UpdateAuthorDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }>;
    deleteAuthor(data: {
        id: string;
    }): Promise<{
        message: string;
    }>;
    listAuthors(): Promise<{
        authors: {
            id: string;
            name: string;
            email: string;
            createdAt: string;
        }[];
    }>;
}
