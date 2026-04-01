"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskBodySchema = exports.createTaskBodySchema = exports.emailBodySchema = exports.emailQuerySchema = void 0;
const zod_1 = require("zod");
exports.emailQuerySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.emailBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.createTaskBodySchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(500),
    description: zod_1.z.string().max(5000).optional().default(''),
});
exports.updateTaskBodySchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(500).optional(),
    description: zod_1.z.string().max(5000).optional(),
    completed: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=validators.js.map