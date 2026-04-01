"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const errors_1 = require("../../../domain/errors");
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: 'Validation failed',
            details: err.flatten(),
        });
        return;
    }
    if (err instanceof errors_1.NotFoundError) {
        res.status(404).json({ error: err.message });
        return;
    }
    if (err instanceof errors_1.ConflictError) {
        res.status(409).json({ error: err.message });
        return;
    }
    if (err instanceof errors_1.DomainError) {
        res.status(400).json({ error: err.message });
        return;
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}
//# sourceMappingURL=error.middleware.js.map