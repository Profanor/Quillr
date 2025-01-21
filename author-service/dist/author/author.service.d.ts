import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma.service';
export declare class AuthorService {
    private prisma;
    constructor(prisma: PrismaService);
    getAuthors(): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
    }[]>;
    create(createAuthorDto: CreateAuthorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthorDto: UpdateAuthorDto): string;
    remove(id: number): string;
}
