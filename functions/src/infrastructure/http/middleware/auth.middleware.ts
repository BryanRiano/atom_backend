import type { Request, Response, NextFunction } from 'express';
import type { TokenServicePort } from '../../../application/ports/token-service.port';

export interface AuthedRequest extends Request {
  auth?: { userId: string; email: string };
}

export function createAuthMiddleware(tokens: TokenServicePort) {
  return (req: AuthedRequest, res: Response, next: NextFunction): void => {
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
    } catch {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}
