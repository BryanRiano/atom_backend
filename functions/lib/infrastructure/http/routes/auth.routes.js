"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = createAuthRoutes;
const express_1 = require("express");
const validators_1 = require("../validators");
function createAuthRoutes(factory) {
    const r = (0, express_1.Router)();
    r.post('/login', async (req, res, next) => {
        try {
            const { email } = validators_1.emailBodySchema.parse(req.body);
            const { accessToken } = await factory.loginUser.execute(email);
            res.json({ accessToken });
        }
        catch (e) {
            next(e);
        }
    });
    return r;
}
//# sourceMappingURL=auth.routes.js.map