"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = createUserRoutes;
const express_1 = require("express");
const validators_1 = require("../validators");
function createUserRoutes(factory) {
    const r = (0, express_1.Router)();
    r.get('/by-email', async (req, res, next) => {
        try {
            const { email } = validators_1.emailQuerySchema.parse(req.query);
            const user = await factory.lookupUserByEmail.execute(email);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({
                id: user.id,
                email: user.email,
                createdAt: user.createdAt.toISOString(),
            });
        }
        catch (e) {
            next(e);
        }
    });
    r.post('/', async (req, res, next) => {
        try {
            const { email } = validators_1.emailBodySchema.parse(req.body);
            const { user, accessToken } = await factory.createUser.execute(email);
            res.status(201).json({
                id: user.id,
                email: user.email,
                createdAt: user.createdAt.toISOString(),
                accessToken,
            });
        }
        catch (e) {
            next(e);
        }
    });
    return r;
}
//# sourceMappingURL=user.routes.js.map