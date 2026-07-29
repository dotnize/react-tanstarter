# Auth Conventions

## Auth Architecture

- Better Auth config lives in `src/lib/auth/auth.ts`.
- Auth utilities are centralized in `src/lib/auth/*`.
- In components, prefer shared auth hooks (`useAuth`, `useAuthSuspense`) from `src/lib/auth/hooks.ts`. These reuse the same auth data as the route loader.
- For route loaders under `_auth`, use `authQueryOptions` with the existing `context.queryClient`, similar to how the user is fetched in `_auth/route.tsx`.

## Route Guards

- Protected route layout is `src/routes/_auth/route.tsx`.
  - It enforces auth in `beforeLoad` using TanStack Query's `ensureQueryData(authQueryOptions())` for optimized navigation UX.
- Guest-only route layout is `src/routes/_guest/route.tsx`.
  - It redirects authenticated users away from login/signup routes.

## Server Functions and Mutations

- Server functions can be called from both server and client code.
  - Server call: executed directly on the server.
  - Client call: treated as RPC and executed through an HTTP API request.
- Treat protected server functions like protected API routes from a security perspective.
- If a server function requires auth, always apply `authMiddleware` from `src/lib/auth/middleware.ts`. This applies even when called from an auth-protected route (`routes/_auth/**`).
- Route-level `beforeLoad` guards protect route navigation/rendering, but they do not replace server-function authorization.
- When auth is required, middleware-provided user context is the source of truth.
