"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const errors_1 = require("../../domain/errors");
class LoginUserUseCase {
    users;
    tokens;
    constructor(users, tokens) {
        this.users = users;
        this.tokens = tokens;
    }
    async execute(email) {
        const user = await this.users.findByEmail(email);
        if (!user) {
            throw new errors_1.NotFoundError('User');
        }
        const accessToken = this.tokens.sign({ sub: user.id, email: user.email });
        return { accessToken };
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
//# sourceMappingURL=login-user.use-case.js.map