# atom_backend

Express + TypeScript API on **Firebase Cloud Functions** (2nd gen) with **Firestore**. Hexagonal architecture: domain and application layers do not depend on Express or Firebase.

OpenAPI: [openapi.yaml](openapi.yaml) (single source of truth for routes and schemas).

## API contract (v1)

Base URL (production): `https://<region>-<project>.cloudfunctions.net/api`  
Local emulator: `http://127.0.0.1:5001/<project>/us-central1/api`

All task endpoints require header: `Authorization: Bearer <accessToken>`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/users/by-email?email=` | Returns user if registered (200) or 404 |
| POST | `/v1/users` | Body `{ "email" }` — creates user; 201 with `accessToken` |
| POST | `/v1/auth/login` | Body `{ "email" }` — JWT for existing user; 404 if unknown |
| GET | `/v1/tasks` | List tasks for authenticated user (newest first) |
| POST | `/v1/tasks` | Body `{ "title", "description?" }` |
| PATCH | `/v1/tasks/:taskId` | Body `{ "title?", "description?", "completed?" }` |
| DELETE | `/v1/tasks/:taskId` | 204 on success |

Auth model: **JWT** (HS256) issued after login or registration. Suitable for this challenge; not a substitute for full OAuth/password flows.

## Project layout

```
functions/src/
  domain/                 # Entities, domain errors
  application/            # Ports, use cases, factory
  infrastructure/
    config/               # Env, wiring (singleton)
    http/                 # Express app, routes, middleware, zod validators
    persistence/          # Firestore repository implementations
    security/             # JWT adapter (port implementation)
  index.ts                # Firebase export `api`
```

## Prerequisites

- Node.js 20
- Firebase CLI (`npm i -g firebase-tools`)
- Firebase project with Firestore enabled

## Configuration

1. Copy `.firebaserc.example` to `.firebaserc` and set your project id.
2. Production: store a strong secret (Google Cloud Secret Manager or Functions env):

```bash
firebase functions:secrets:set JWT_SECRET
```

Reference it in `functions` (Firebase console → Functions → configuration) or use `defineSecret` in code when you move to parameterized config.

3. Set **CORS** for your Angular origin:

```bash
firebase functions:config:set cors.origins="https://your-app.web.app,http://localhost:4200"
```

The code reads `CORS_ORIGINS` as a comma-separated env var. In Firebase, map this via runtime config or the same secret pattern you choose for deployment.

4. Local emulator: optional `.env` in `functions/` (see `functions/.env.example`). Emulator also accepts a built-in dev JWT secret when `FUNCTIONS_EMULATOR=true`.

## Scripts (from `functions/`)

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript → `lib/` |
| `npm test` | Unit tests (use cases with mocked ports) |
| `npm run lint` | `tsc --noEmit` |
| `npm run serve` | Build + `firebase emulators:start --only functions,firestore` |

## Deploy

```bash
cd functions && npm run build && cd ..
firebase deploy --only functions,firestore:indexes,firestore:rules
```

Firestore access is **server-side only** (Admin SDK). Client apps never talk to Firestore directly; rules deny all client access by design.

## Firestore data model

- `users/{id}` — fields: `email` (lowercase), `createdAt`
- `tasks/{id}` — fields: `userId`, `title`, `description`, `completed`, `createdAt`

Composite index: `tasks` — `userId` ASC, `createdAt` DESC ([firestore.indexes.json](firestore.indexes.json)).

## CI

GitHub Actions runs install, typecheck, test, and build on push/PR (see `.github/workflows/ci.yml`).

## Pairing with the frontend

Point the Angular `apiBaseUrl` at this function’s public URL and add that Hosting origin to `CORS_ORIGINS`. Deploy order: backend (Functions + Firestore indexes) first, then update the frontend environment and deploy Hosting.
