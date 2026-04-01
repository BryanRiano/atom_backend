export function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (s && s.length >= 16) {
    return s;
  }
  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    return 'emulator-only-secret-min-16-chars';
  }
  throw new Error('JWT_SECRET must be set and at least 16 characters');
}

export function getCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS || 'http://localhost:4200';
  return raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

export function getRateLimitWindowMs(): number {
  const n = Number(process.env.RATE_LIMIT_WINDOW_MS);
  return Number.isFinite(n) && n > 0 ? n : 15 * 60 * 1000;
}

export function getRateLimitMax(): number {
  const n = Number(process.env.RATE_LIMIT_MAX);
  return Number.isFinite(n) && n > 0 ? n : 100;
}
