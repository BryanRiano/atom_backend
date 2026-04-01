"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupUserByEmailUseCase = void 0;
class LookupUserByEmailUseCase {
    users;
    constructor(users) {
        this.users = users;
    }
    execute(email) {
        return this.users.findByEmail(email);
    }
}
exports.LookupUserByEmailUseCase = LookupUserByEmailUseCase;
//# sourceMappingURL=lookup-user-by-email.use-case.js.map