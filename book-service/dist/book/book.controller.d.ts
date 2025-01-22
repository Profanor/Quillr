import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<{
        id: string;
        title: string;
        authorId: string;
        publishedYear: number;
        createdAt: string;
    }>;
    findOne(data: {
        id: string;
    }): Promise<{
        id: string;
        title: string;
        authorId: string;
        publishedYear: number;
        createdAt: string;
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
