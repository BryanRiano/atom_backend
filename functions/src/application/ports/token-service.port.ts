export interface AuthTokenPayload {
  sub: string;
  email: string;
}

export interface TokenServicePort {
  sign(payload: AuthTokenPayload): string;
  verify(token: string): AuthTokenPayload;
}
