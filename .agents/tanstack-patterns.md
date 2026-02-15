<!-- based on https://github.com/TanStack/tanstack.com/blob/main/.claude/tanstack-patterns.md -->

# TanStack Patterns

## Route Group Conventions

- Protected routes live under `apps/web/src/routes/_auth/**`, enforced by `beforeLoad` in the `_auth` layout (`apps/web/src/routes/_auth/route.tsx`).
- Guest-only routes live under `apps/web/src/routes/_guest/**`, enforced by `beforeLoad` in the `_guest` layout (`apps/web/src/routes/_guest/route.tsx`).
- Auth-specific route guard behavior and middleware rules are documented in `.agents/auth.md`.

## Data Fetching

Route loaders are isomorphic; they run on both server and client. They cannot directly access server-only APIs.

```typescript
// Bad: direct server API access
loader: async () => {
  const todos = await fs.readFile("todos.json");
  return { todos };
};
```

```typescript
// Good (minimal/valid): call a server function from the loader
loader: async () => {
  const todos = await $getTodos({ data: {} });
  return { todos };
};
```

Instead of directly calling server functions in loaders, prefer wrapping in TanStack Query for better caching and reusability.

```typescript
loader: async ({ context }) => {
  // Best/Preferred: For read/data-fetching server functions, wrap in TanStack Query
  const todos = await context.queryClient.ensureQueryData(todosQueryOptions());
  return { todos };
};

// lib/todos/queries.ts
export const todosQueryOptions = () =>
  queryOptions({
    queryKey: ["todos"],
    queryFn: ({ signal }) => $getTodos({ signal }), // TanStack Query calls the server function
  });
```

## Environment Shaking

TanStack Start strips any code not referenced by a `createServerFn` handler from the client build.

- Server-only code (database, fs) is automatically excluded from client bundles
- Only code inside `createServerFn` handlers goes to server bundles
- Code outside handlers is included in both bundles

## Importing Server Functions

Server functions wrapped in `createServerFn` can be imported statically. Never use dynamic imports for server-only code in components. Prefix server function names with `$` (e.g. `$getUser`) for easier identification.

```typescript
// Bad: dynamic import causes bundler issues
const rolesQuery = useQuery({
  queryFn: async () => {
    const { $listRoles } = await import("~/utils/roles.server");
    return $listRoles({ data: {} });
  },
});

// Good: static import
import { $listRoles } from "~/utils/roles.server";

const rolesQuery = useQuery({
  queryFn: async () => $listRoles({ data: {} }),
});
```

## Server-Only Import Rules

1. `createServerFn` wrappers can be imported statically anywhere
2. Direct server-only code (database clients, fs) must only be imported:
   - Inside `createServerFn` handlers
   - In `*.server.ts` files

## Auth-specific Patterns

- See `.agents/auth.md` for auth middleware usage, route guards, and session/cookie patterns.
