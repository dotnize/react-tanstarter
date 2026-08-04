# TanStack Patterns

## Route Group Conventions

- Protected routes live under `src/routes/_auth/**`, enforced by `beforeLoad` in the `_auth` layout (`src/routes/_auth/route.tsx`).
- Guest-only routes live under `src/routes/_guest/**`, enforced by `beforeLoad` in the `_guest` layout (`src/routes/_guest/route.tsx`).
- Auth-specific route guard behavior and middleware rules are documented in `.agents/auth.md`.

## Data Fetching

TanStack Query is the client cache and source of truth for server-owned or server-derived data. Router owns params, search state, redirects, and other route decisions.

- Define reusable `queryOptions` factories. The `queryFn` should call a Start server function and forward its `signal`.
- Use the same options with loaders, `beforeLoad`, `useQuery`/`useSuspenseQuery`, and cache updates.
- Do not return query data from a loader for components to read with `useLoaderData`; warm the Query cache, then subscribe to it in the component.
- Loaders and `beforeLoad` may return URL-derived or routing-only values; do not use them as a second cache for server data.

Route loaders are isomorphic; they run on both server and client. Keep database, filesystem, secrets, and other server-only access behind a server function.

```typescript
export const todosQueryOptions = () =>
  queryOptions({
    queryKey: ["todos"],
    queryFn: ({ signal }) => $getTodos({ signal }),
  });

// Route loader
loader: ({ context }) => context.queryClient.ensureQueryData(todosQueryOptions());

// Route component
const { data: todos } = useSuspenseQuery(todosQueryOptions());
```

Use `beforeLoad` only when query data affects routing, such as an auth redirect. Follow `src/routes/_auth/route.tsx`; route guards should read `authQueryOptions()` through `context.queryClient` rather than copy user data into router context.

### Freshness and Navigation

`ensureQueryData` behaves as follows:

- Missing cache: fetch and wait.
- Fresh cache: return it immediately.
- Stale cache: return it immediately without refetching by default.
- `revalidateIfStale: true`: return stale data immediately and refetch it in the background.

Choose `staleTime` per query. Allow stale data when faster navigation and fewer server/database requests matter more than immediate freshness. Add `revalidateIfStale: true` when stale data may render or drive a route decision but should refresh without blocking navigation.

Use `prefetchQuery` without awaiting it for non-critical data. Use `ensureQueryData` for data required before rendering or making a route decision.

Never use cached route data as a security decision. Fresh authorization and destructive-operation checks belong in the server function or its middleware.

## Mutations

Use TanStack Query's `useMutation` with Start server functions. Prefer a single-round-trip mutation: return the canonical affected data, then write it to every exact cache that can be updated safely. Do not issue a follow-up read by default.

```typescript
const updateTodo = useMutation({
  mutationFn: $updateTodo,
  onSuccess: (updated) => {
    queryClient.setQueryData(todoQueryOptions(updated.id).queryKey, updated);
    queryClient.setQueryData(todosQueryOptions().queryKey, (current) =>
      current?.map((todo) => (todo.id === updated.id ? updated : todo)),
    );
  },
});
```

- Update caches immutably from the server result, not from assumptions about what the server stored.
- Invalidate only affected caches that cannot be reconstructed safely, such as aggregates, permission-dependent data, or lists whose membership/order may change.
- Avoid broad invalidation and automatic refetch-after-every-write.
- Use `router.invalidate()` only when route guards, redirects, or other route logic must rerun. It is not the default way to refresh query-backed data.

### True Optimistic Updates

An `onSuccess` cache write is response-driven, not optimistic. Use a true `onMutate` update only when the action is reversible, the cache transformation is predictable, and latency materially affects the interaction.

In `onMutate`, cancel matching queries, snapshot previous data, and update the cache. Roll back in `onError`, then reconcile with the server result or targeted invalidation.

Do not optimistically apply destructive or security-sensitive mutations, server-generated identities, or complex multi-entity side effects. Wait for server confirmation, then update or remove cached data.

## Auth and Security Boundaries

- `_auth` `beforeLoad` caching improves navigation UX; treat every protected server function as an independently callable API endpoint.
- Use `authMiddleware` from `src/lib/auth/middleware.ts` when cached session state is acceptable; use `freshAuthMiddleware` for destructive or security-sensitive mutations.
- Always perform authorization and resource-access checks on the server.
- See `.agents/auth.md` for additional auth middleware, route guard, and session/cookie conventions.

## Server Boundaries

- Import `createServerFn` wrappers statically anywhere; never dynamically import them. Prefix their names with `$` (for example, `$getUser`).
- Guard server-only logic with a handler, `createServerOnlyFn`, `*.server.*`, or `import "@tanstack/react-start/server-only";`. Module-scope imports are fine behind these boundaries; never run server-only logic in isomorphic module scope.
