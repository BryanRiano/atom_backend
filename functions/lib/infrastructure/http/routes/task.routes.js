"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskRoutes = createTaskRoutes;
const express_1 = require("express");
const validators_1 = require("../validators");
function createTaskRoutes(factory, requireAuth) {
    const r = (0, express_1.Router)();
    r.use(requireAuth);
    r.get('/', async (req, res, next) => {
        try {
            const tasks = await factory.listTasks.execute(req.auth.userId);
            res.json(tasks.map((t) => ({
                id: t.id,
                userId: t.userId,
                title: t.title,
                description: t.description,
                createdAt: t.createdAt.toISOString(),
                completed: t.completed,
            })));
        }
        catch (e) {
            next(e);
        }
    });
    r.post('/', async (req, res, next) => {
        try {
            const body = validators_1.createTaskBodySchema.parse(req.body);
            const task = await factory.createTask.execute(req.auth.userId, body.title, body.description);
            res.status(201).json({
                id: task.id,
                userId: task.userId,
                title: task.title,
                description: task.description,
                createdAt: task.createdAt.toISOString(),
                completed: task.completed,
            });
        }
        catch (e) {
            next(e);
        }
    });
    r.patch('/:taskId', async (req, res, next) => {
        try {
            const body = validators_1.updateTaskBodySchema.parse(req.body);
            const taskId = String(req.params.taskId);
            const task = await factory.updateTask.execute(req.auth.userId, taskId, body);
            res.json({
                id: task.id,
                userId: task.userId,
                title: task.title,
                description: task.description,
                createdAt: task.createdAt.toISOString(),
                completed: task.completed,
            });
        }
        catch (e) {
            next(e);
        }
    });
    r.delete('/:taskId', async (req, res, next) => {
        try {
            await factory.deleteTask.execute(req.auth.userId, String(req.params.taskId));
            res.status(204).send();
        }
        catch (e) {
            next(e);
        }
    });
    return r;
}
//# sourceMappingURL=task.routes.js.map