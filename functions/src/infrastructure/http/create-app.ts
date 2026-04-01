import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { UseCaseFactory } from '../../application/factories/use-case.factory';
import type { TokenServicePort } from '../../application/ports/token-service.port';
import { getCorsOrigins, getRateLimitMax, getRateLimitWindowMs } from '../config/env';
import { createAuthMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { createUserRoutes } from './routes/user.routes';
import { createAuthRoutes } from './routes/auth.routes';
import { createTaskRoutes } from './routes/task.routes';

export function createApp(factory: UseCaseFactory, tokens: TokenServicePort): express.Express {
  const app = express();
  app.set('trust proxy', 1);
  app.use(
    rateLimit({
      windowMs: getRateLimitWindowMs(),
      max: getRateLimitMax(),
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  app.use(helmet());
  app.use(
    cors({
      origin: getCorsOrigins(),
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));

  const authMw = createAuthMiddleware(tokens);

  app.use('/v1/users', createUserRoutes(factory));
  app.use('/v1/auth', createAuthRoutes(factory));
  app.use('/v1/tasks', createTaskRoutes(factory, authMw));

  app.use(errorMiddleware);

  return app;
}
