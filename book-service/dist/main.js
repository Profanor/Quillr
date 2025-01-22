"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const reflection_1 = require("@grpc/reflection");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'book',
            protoPath: (0, path_1.join)(__dirname, 'proto/book.proto'),
            url: 'localhost:50052',
            onLoadPackageDefinition: (pkg, server) => {
                new reflection_1.ReflectionService(pkg).addToServer(server);
            },
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map