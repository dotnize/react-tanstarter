# Auth Conventions

## Auth Architecture

- Better Auth config lives in `packages/auth/src/auth.ts`.
- Auth utilities are centralized in `packages/auth/src/tanstack/*`.
- In components, prefer shared auth hooks (`useAuth`, `useAuthSuspense`) from `packages/auth/src/tanstack/hooks.ts`. These reuse the same auth data as the route loader.
- For route loaders under `_auth`, prefer loader context user over duplicate auth fetches.

## Route Guards

- Protected route layout is `apps/web/src/routes/_auth/route.tsx`.
  - It enforces auth in `beforeLoad` using `ensureQueryData(authQueryOptions())`.
  - It returns `{ user }`, which is available to all child route loaders via router context.
- Guest-only route layout is `apps/web/src/routes/_guest/route.tsx`.
  - It redirects authenticated users away from login/signup routes.

## Server Functions and Mutations

- Server functions can be called from both server and client code.
  - Server call: executed directly on the server.
  - Client call: treated as RPC and executed through an HTTP API request.
- Treat protected server functions like protected API routes from a security perspective.
- If a server function requires auth, always apply `authMiddleware` from `packages/auth/src/tanstack/middleware.ts`. This applies even when called from an auth-protected route (`routes/_auth/**`).
- Route-level `beforeLoad` guards protect route navigation/rendering, but they do not replace server-function authorization.
- When auth is required, middleware-provided user context is the source of truth.
