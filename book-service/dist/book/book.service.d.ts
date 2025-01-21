import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
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
    update(id: number, updateBookDto: UpdateBookDto): string;
    remove(id: number): string;
}
