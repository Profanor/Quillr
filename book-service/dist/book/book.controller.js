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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getBooks() {
        return await this.bookService.getBooks();
    }
    create(createBookDto) {
        return this.bookService.create(createBookDto);
    }
    findAll() {
        return this.bookService.findAll();
    }
    findOne(id) {
        return this.bookService.findOne(id);
    }
    update(updateBookDto) {
        return this.bookService.update(updateBookDto.id, updateBookDto);
    }
    remove(id) {
        return this.bookService.remove(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBooks", null);
__decorate([
    (0, microservices_1.MessagePattern)('createBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllBook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeBook'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "remove", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map