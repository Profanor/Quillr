import { PrismaService } from '../prisma.service';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookService {
    private prisma;
    private client;
    private authorClient;
    constructor(prisma: PrismaService, client: ClientGrpc);
    onModuleInit(): void;
    createBook(createBookDto: CreateBookDto): Promise<{
        id: string;
        title: string;
        authorId: string;
        publishedYear: number;
        createdAt: string;
    }>;
    getBook(data: {
        id: string;
    }): Promise<{
        id: string;
        title: string;
        authorId: string;
        publishedYear: number;
        createdAt: string;
    }>;
    updateBook(updateBookDto: UpdateBookDto & {
        id: string;
    }): Promise<{
        id: string;
        title: string;
        authorId: string;
        publishedYear: number;
        createdAt: string;
    }>;
    deleteBook(data: {
        id: string;
    }): Promise<{
        message: string;
    }>;
    listBooks(): Promise<{
        books: {
            id: string;
            title: string;
            authorId: string;
            publishedYear: number;
            createdAt: string;
        }[];
    }>;
    getBooksByAuthor(data: {
        authorId: string;
    }): Promise<{
        author: {
            id: any;
            name: any;
        };
        books: {
            id: string;
            title: string;
            authorId: string;
            publishedYear: number;
            createdAt: string;
        }[];
    }>;
}
