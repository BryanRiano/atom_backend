"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthMiddleware = createAuthMiddleware;
function createAuthMiddleware(tokens) {
    return (req, res, next) => {
        const header = req.headers.authorization;
        if (!header?.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Missing or invalid Authorization header' });
            return;
        }
        const token = header.slice(7);
        try {
            const payload = tokens.verify(token);
            req.auth = { userId: payload.sub, email: payload.email };
            next();
        }
        catch {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    };
}
//# sourceMappingURL=auth.middleware.js.map