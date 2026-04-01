import { Router, type RequestHandler, type Response, type NextFunction } from 'express';
import type { UseCaseFactory } from '../../../application/factories/use-case.factory';
import type { AuthedRequest } from '../middleware/auth.middleware';
import { createTaskBodySchema, updateTaskBodySchema } from '../validators';

export function createTaskRoutes(factory: UseCaseFactory, requireAuth: RequestHandler): Router {
  const r = Router();
  r.use(requireAuth);

  r.get('/', async (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      const tasks = await factory.listTasks.execute(req.auth!.userId);
      res.json(
        tasks.map((t) => ({
          id: t.id,
          userId: t.userId,
          title: t.title,
          description: t.description,
          createdAt: t.createdAt.toISOString(),
          completed: t.completed,
        }))
      );
    } catch (e) {
      next(e);
    }
  });

  r.post('/', async (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      const body = createTaskBodySchema.parse(req.body);
      const task = await factory.createTask.execute(req.auth!.userId, body.title, body.description);
      res.status(201).json({
        id: task.id,
        userId: task.userId,
        title: task.title,
        description: task.description,
        createdAt: task.createdAt.toISOString(),
        completed: task.completed,
      });
    } catch (e) {
      next(e);
    }
  });

  r.patch('/:taskId', async (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      const body = updateTaskBodySchema.parse(req.body);
      const taskId = String(req.params.taskId);
      const task = await factory.updateTask.execute(req.auth!.userId, taskId, body);
      res.json({
        id: task.id,
        userId: task.userId,
        title: task.title,
        description: task.description,
        createdAt: task.createdAt.toISOString(),
        completed: task.completed,
      });
    } catch (e) {
      next(e);
    }
  });

  r.delete('/:taskId', async (req: AuthedRequest, res: Response, next: NextFunction) => {
    try {
      await factory.deleteTask.execute(req.auth!.userId, String(req.params.taskId));
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  return r;
}
