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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const create_author_dto_1 = require("./dto/create-author.dto");
const update_author_dto_1 = require("./dto/update-author.dto");
const prisma_service_1 = require("../prisma.service");
const microservices_1 = require("@nestjs/microservices");
let AuthorService = class AuthorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAuthor(createAuthorDto) {
        const { name, email } = createAuthorDto;
        const createdAuthor = await this.prisma.author.create({
            data: {
                name,
                email,
            },
        });
        return {
            id: createdAuthor.id,
            name: createdAuthor.name,
            email: createdAuthor.email,
            createdAt: createdAuthor.createdAt.toISOString(),
        };
    }
    async getAuthor(data) {
        const { id } = data;
        const author = await this.prisma.author.findUnique({ where: { id } });
        if (!author) {
            throw new Error('Author not found');
        }
        return {
            id: author.id,
            name: author.name,
            email: author.email,
            createdAt: author.createdAt.toISOString(),
        };
    }
    async updateAuthor(updateAuthorDto) {
        const { id, name, email } = updateAuthorDto;
        const existingAuthor = await this.prisma.author.findUnique({
            where: { id },
        });
        if (!existingAuthor) {
            throw new Error('Author not found');
        }
        const updatedAuthor = await this.prisma.author.update({
            where: { id },
            data: { name, email },
        });
        return {
            id: updatedAuthor.id,
            name: updatedAuthor.name,
            email: updatedAuthor.email,
            createdAt: updatedAuthor.createdAt.toISOString(),
        };
    }
    async deleteAuthor(data) {
        const { id } = data;
        const author = await this.prisma.author.findUnique({ where: { id } });
        if (!author) {
            throw new Error('Author not found');
        }
        await this.prisma.author.delete({
            where: { id },
        });
        return { message: 'Author deleted successfully' };
    }
    async listAuthors() {
        const authors = await this.prisma.author.findMany();
        return {
            authors: authors.map(author => ({
                id: author.id,
                name: author.name,
                email: author.email,
                createdAt: author.createdAt.toISOString(),
            })),
        };
    }
};
exports.AuthorService = AuthorService;
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'createAuthor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_author_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorService.prototype, "createAuthor", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'getAuthor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorService.prototype, "getAuthor", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'updateAuthor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_author_dto_1.UpdateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorService.prototype, "updateAuthor", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'deleteAuthor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorService.prototype, "deleteAuthor", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'listAuthors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorService.prototype, "listAuthors", null);
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthorService);
//# sourceMappingURL=author.service.js.map