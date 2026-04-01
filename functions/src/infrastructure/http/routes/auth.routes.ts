import { Router, type Request, type Response, type NextFunction } from 'express';
import type { UseCaseFactory } from '../../../application/factories/use-case.factory';
import { emailBodySchema } from '../validators';

export function createAuthRoutes(factory: UseCaseFactory): Router {
  const r = Router();

  r.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = emailBodySchema.parse(req.body);
      const { accessToken } = await factory.loginUser.execute(email);
      res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
