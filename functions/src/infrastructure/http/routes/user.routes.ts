import { Router, type Request, type Response, type NextFunction } from 'express';
import type { UseCaseFactory } from '../../../application/factories/use-case.factory';
import { emailBodySchema, emailQuerySchema } from '../validators';

export function createUserRoutes(factory: UseCaseFactory): Router {
  const r = Router();

  r.get('/by-email', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = emailQuerySchema.parse(req.query);
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
    } catch (e) {
      next(e);
    }
  });

  r.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = emailBodySchema.parse(req.body);
      const { user, accessToken } = await factory.createUser.execute(email);
      res.status(201).json({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        accessToken,
      });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
