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
    async getAuthors() {
        return await this.authorService.getAuthors();
    }
    create(createAuthorDto) {
        return this.authorService.create(createAuthorDto);
    }
    findAll() {
        return this.authorService.findAll();
    }
    findOne(id) {
        return this.authorService.findOne(id);
    }
    update(updateAuthorDto) {
        return this.authorService.update(updateAuthorDto.id, updateAuthorDto);
    }
    remove(id) {
        return this.authorService.remove(id);
    }
};
exports.AuthorController = AuthorController;
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "getAuthors", null);
__decorate([
    (0, microservices_1.MessagePattern)('createAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_author_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllAuthor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_author_dto_1.UpdateAuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeAuthor'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "remove", null);
exports.AuthorController = AuthorController = __decorate([
    (0, common_1.Controller)('authors'),
    __metadata("design:paramtypes", [author_service_1.AuthorService])
], AuthorController);
//# sourceMappingURL=author.controller.js.map