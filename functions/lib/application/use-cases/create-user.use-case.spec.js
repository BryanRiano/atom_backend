"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_use_case_1 = require("./create-user.use-case");
const errors_1 = require("../../domain/errors");
describe('CreateUserUseCase', () => {
    it('creates user and returns token', async () => {
        const user = {
            id: 'u1',
            email: 'a@b.com',
            createdAt: new Date(),
        };
        const users = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn(),
            create: jest.fn().mockResolvedValue(user),
        };
        const tokens = {
            sign: jest.fn().mockReturnValue('jwt-token'),
            verify: jest.fn(),
        };
        const uc = new create_user_use_case_1.CreateUserUseCase(users, tokens);
        const result = await uc.execute('a@b.com');
        expect(result.user).toEqual(user);
        expect(result.accessToken).toBe('jwt-token');
        expect(tokens.sign).toHaveBeenCalledWith({ sub: 'u1', email: 'a@b.com' });
    });
    it('throws when email exists', async () => {
        const users = {
            findByEmail: jest.fn().mockResolvedValue({
                id: 'x',
                email: 'a@b.com',
                createdAt: new Date(),
            }),
            findById: jest.fn(),
            create: jest.fn(),
        };
        const tokens = {
            sign: jest.fn(),
            verify: jest.fn(),
        };
        const uc = new create_user_use_case_1.CreateUserUseCase(users, tokens);
        await expect(uc.execute('a@b.com')).rejects.toBeInstanceOf(errors_1.ConflictError);
    });
});
//# sourceMappingURL=create-user.use-case.spec.js.map