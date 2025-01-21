import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getBooks(): Promise<{
        id: string;
        title: string;
        authorId: string;
        publishedYear: number;
        createdAt: Date;
    }[]>;
    create(createBookDto: CreateBookDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateBookDto: UpdateBookDto): string;
    remove(id: number): string;
}
