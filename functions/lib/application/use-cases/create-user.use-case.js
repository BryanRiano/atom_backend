"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const errors_1 = require("../../domain/errors");
class CreateUserUseCase {
    users;
    tokens;
    constructor(users, tokens) {
        this.users = users;
        this.tokens = tokens;
    }
    async execute(email) {
        const existing = await this.users.findByEmail(email);
        if (existing) {
            throw new errors_1.ConflictError('Email already registered');
        }
        const user = await this.users.create(email);
        const accessToken = this.tokens.sign({ sub: user.id, email: user.email });
        return { user, accessToken };
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=create-user.use-case.js.map