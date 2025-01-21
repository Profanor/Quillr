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
exports.AuthorController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const author_service_1 = require("./author.service");
const create_author_dto_1 = require("./dto/create-author.dto");
const update_author_dto_1 = require("./dto/update-author.dto");
let AuthorController = class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
    }
    create(createAuthorDto) {
        return this.authorService.createAuthor(createAuthorDto);
    }
    findOne(data) {
        return this.authorService.getAuthor(data);
    }
    update(updateAuthorDto) {
        return this.authorService.updateAuthor(updateAuthorDto);
    }
    async listAuthors() {
        return await this.authorService.listAuthors();
    }
    async delete(data) {
        return this.authorService.deleteAuthor(data);
    }
};
exports.AuthorController = AuthorController;
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'createAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_author_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'getAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'updateAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_author_dto_1.UpdateAuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'listAuthors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "listAuthors", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AuthorService', 'deleteAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "delete", null);
exports.AuthorController = AuthorController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [author_service_1.AuthorService])
], AuthorController);
//# sourceMappingURL=author.controller.js.map