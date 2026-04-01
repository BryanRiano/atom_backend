import jwt from 'jsonwebtoken';
import type { AuthTokenPayload, TokenServicePort } from '../../application/ports/token-service.port';

export class JwtTokenService implements TokenServicePort {
  constructor(private readonly secret: string) {}

  sign(payload: AuthTokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }

  verify(token: string): AuthTokenPayload {
    const decoded = jwt.verify(token, this.secret) as AuthTokenPayload;
    if (!decoded?.sub || !decoded?.email) {
      throw new Error('Invalid token payload');
    }
    return { sub: decoded.sub, email: decoded.email };
  }
}
