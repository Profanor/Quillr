"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const create_book_dto_1 = require("./dto/create-book.dto");
let BookService = class BookService {
    constructor(prisma, client) {
        this.prisma = prisma;
        this.client = client;
    }
    onModuleInit() {
        this.authorClient = this.client.getService('AuthorService');
    }
    async createBook(createBookDto) {
        console.log('createBook called with:', createBookDto);
        const { title, authorId, publishedYear } = createBookDto;
        let author;
        try {
            author = await (0, rxjs_1.lastValueFrom)(this.authorClient.getAuthor({ id: authorId }));
        }
        catch {
            throw new Error(`Author with ID ${authorId} not found`);
        }
        const createdBook = await this.prisma.book.create({
            data: {
                title,
                authorId,
                publishedYear,
            },
        });
        return {
            id: createdBook.id,
            title: createdBook.title,
            authorId: createdBook.authorId,
            publishedYear: createdBook.publishedYear,
            createdAt: createdBook.createdAt.toISOString(),
        };
    }
    async getBook(data) {
        const { id } = data;
        const book = await this.prisma.book.findUnique({ where: { id } });
        if (!book) {
            throw new Error(`Book with ID ${data.id} not found`);
        }
        return {
            id: book.id,
            title: book.title,
            authorId: book.authorId,
            publishedYear: book.publishedYear,
            createdAt: book.createdAt.toISOString(),
        };
    }
    async updateBook(updateBookDto) {
        const { id, title, publishedYear } = updateBookDto;
        const existingBook = await this.prisma.book.findUnique({
            where: { id },
        });
        if (!existingBook) {
            throw new Error('Book not found');
        }
        ;
        const updatedBook = await this.prisma.book.update({
            where: { id },
            data: { title, publishedYear },
        });
        return {
            id: updatedBook.id,
            title: updatedBook.title,
            authorId: updatedBook.authorId,
            publishedYear: updatedBook.publishedYear,
            createdAt: updatedBook.createdAt.toISOString(),
        };
    }
    async deleteBook(data) {
        const { id } = data;
        const book = await this.prisma.book.findUnique({ where: { id } });
        if (!book) {
            throw new Error('Book not found');
        }
        await this.prisma.book.delete({
            where: { id }
        });
        return { message: 'Book deleted successfully' };
    }
    async listBooks() {
        const books = await this.prisma.book.findMany();
        return {
            books: books.map((book) => ({
                id: book.id,
                title: book.title,
                authorId: book.authorId,
                publishedYear: book.publishedYear,
                createdAt: book.createdAt.toISOString(),
            })),
        };
    }
    async getBooksByAuthor(data) {
        let author;
        try {
            author = await (0, rxjs_1.lastValueFrom)(this.authorClient.getAuthor({ id: data.authorId }));
        }
        catch {
            throw new Error(`Author with ID ${data.authorId} not found`);
        }
        const books = await this.prisma.book.findMany({ where: { authorId: data.authorId } });
        return {
            author: {
                id: author.id,
                name: author.name,
            },
            books: books.map((book) => ({
                id: book.id,
                title: book.title,
                authorId: book.authorId,
                publishedYear: book.publishedYear,
                createdAt: book.createdAt.toISOString(),
            })),
        };
    }
};
exports.BookService = BookService;
__decorate([
    (0, microservices_1.GrpcMethod)('BookService', 'createBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookService.prototype, "createBook", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BookService', 'getBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookService.prototype, "getBook", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BookService', 'updateBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookService.prototype, "updateBook", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BookService', 'deleteBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookService.prototype, "deleteBook", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BookService', 'listBooks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookService.prototype, "listBooks", null);
__decorate([
    (0, microservices_1.GrpcMethod)('BookService', 'getBooksByAuthor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookService.prototype, "getBooksByAuthor", null);
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('AUTHOR_PACKAGE')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], BookService);
//# sourceMappingURL=book.service.js.map