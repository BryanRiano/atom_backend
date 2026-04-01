"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("../config/env");
const auth_middleware_1 = require("./middleware/auth.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
const task_routes_1 = require("./routes/task.routes");
function createApp(factory, tokens) {
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use((0, express_rate_limit_1.default)({
        windowMs: (0, env_1.getRateLimitWindowMs)(),
        max: (0, env_1.getRateLimitMax)(),
        standardHeaders: true,
        legacyHeaders: false,
    }));
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: (0, env_1.getCorsOrigins)(),
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: '1mb' }));
    const authMw = (0, auth_middleware_1.createAuthMiddleware)(tokens);
    app.use('/v1/users', (0, user_routes_1.createUserRoutes)(factory));
    app.use('/v1/auth', (0, auth_routes_1.createAuthRoutes)(factory));
    app.use('/v1/tasks', (0, task_routes_1.createTaskRoutes)(factory, authMw));
    app.use(error_middleware_1.errorMiddleware);
    return app;
}
//# sourceMappingURL=create-app.js.map