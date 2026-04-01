"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_user_use_case_1 = require("./login-user.use-case");
const errors_1 = require("../../domain/errors");
describe('LoginUserUseCase', () => {
    it('returns token for existing user', async () => {
        const user = {
            id: 'u1',
            email: 'a@b.com',
            createdAt: new Date(),
        };
        const users = {
            findByEmail: jest.fn().mockResolvedValue(user),
            findById: jest.fn(),
            create: jest.fn(),
        };
        const tokens = {
            sign: jest.fn().mockReturnValue('jwt'),
            verify: jest.fn(),
        };
        const uc = new login_user_use_case_1.LoginUserUseCase(users, tokens);
        const result = await uc.execute('a@b.com');
        expect(result.accessToken).toBe('jwt');
    });
    it('throws when user missing', async () => {
        const users = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn(),
            create: jest.fn(),
        };
        const tokens = {
            sign: jest.fn(),
            verify: jest.fn(),
        };
        const uc = new login_user_use_case_1.LoginUserUseCase(users, tokens);
        await expect(uc.execute('x@y.com')).rejects.toBeInstanceOf(errors_1.NotFoundError);
    });
});
//# sourceMappingURL=login-user.use-case.spec.js.map