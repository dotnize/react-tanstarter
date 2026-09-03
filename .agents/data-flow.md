# Data Flow

## Router and Query Responsibilities

TanStack Query is the source of truth for server-owned data. TanStack Router owns params, validated search state, redirects, and route lifecycle.

- Define reusable `queryOptions` factories and use the same options in loaders, `beforeLoad`, components, and cache updates.
- Include every `queryFn` input in its `queryKey`. Use `loaderDeps` for validated search values that affect a loader, returning only the relevant values.
- Default non-critical app data to component hooks: use `useQuery` with local pending/error UI, or `useSuspenseQuery` with a deliberate pending boundary.
- For nested routes, keep persistent layout UI outside the child pending boundary. Place a content-only `Suspense` boundary around the layout's `<Outlet />`, or define `pendingComponent` on each child route, so child loading does not replace the parent shell.
- As a narrow performance exception, kick off the primary query for a route in its loader without blocking navigation when the route is likely to be revisited often or directly supports a core, high-value user outcome. Keep secondary and supporting queries in component hooks.
- Prefer loaders for this warming. Use `beforeLoad` only when there is a concrete reason to begin before matched loaders; never await best-effort warming in `beforeLoad`.
- For the rare case where data is required before rendering, await its query in a loader, then subscribe from the component. Do not read Query-owned data with `useLoaderData`.
- Loaders and `beforeLoad` may return routing-only values; do not mirror Query-owned server data into Router context or loader data.
- Keep `defaultPreload: "intent"` to preload route component bundles. Because router preloading may also run loaders and `beforeLoad`, keep non-critical data in component hooks so link intent does not trigger unnecessary data fetching.
- When Query owns freshness, keep `defaultPreloadStaleTime: 0` in the Router config so preload events reach the loader and Query decides whether to fetch.

```tsx
import { noop, queryOptions, useQuery } from "@tanstack/react-query";

export const todosQueryOptions = () =>
  queryOptions({
    queryKey: ["todos"],
    queryFn: ({ signal }) => $getTodos({ signal }),
  });

// Preferred default: fetch in the component and render its pending state.
function Todos() {
  const todosQuery = useQuery(todosQueryOptions());

  if (todosQuery.isPending) return <TodosSkeleton />;
  if (todosQuery.isError) return <TodosError />;

  return <TodoList todos={todosQuery.data} />;
}

// Narrow exception: warm primary data without delaying navigation.
loader: ({ context }) => {
  void context.queryClient.query(todosQueryOptions()).catch(noop);
},

// Exception: await navigation-critical data without returning it from the loader.
loader: async ({ context }) => {
  await context.queryClient.query(todosQueryOptions());
},
```

Treat non-blocking route warming as a limited performance budget. Use it only when all of these are true:

- There is a strong product reason or usage data suggesting frequent visits, or the route directly supports a core, high-value outcome.
- The query powers the primary initial view rather than secondary panels, tabs, or speculative follow-up data.
- Starting the request on preload or navigation is expected to materially improve perceived latency enough to justify an occasional unused request.

The component hook still owns pending, error, and rendered states. A warming failure must not fail navigation; the hook may retry according to its normal policy.

`beforeLoad` is primarily for data that affects routing, such as an auth redirect. If the rare warming exception above must begin there, kick off the query without awaiting it. `beforeLoad` runs serially before matched loaders, while loaders can run in parallel. Follow `src/routes/_auth/route.tsx` for the protected-layout pattern; keep cached user data in Query rather than Router context.

Route loaders are isomorphic. Keep database, filesystem, secrets, and other server-only work behind a Start server function, and forward the Query `signal` to it.

## `queryClient.query`

`queryClient.query` is the imperative, non-reactive API for loaders, `beforeLoad`, and callbacks. Components must use Query hooks to subscribe to cache updates.

It uses the effective `staleTime` as follows:

- Missing cache: fetch and wait.
- Fresh cache: return cached data.
- Stale or invalidated cache: fetch and wait.
- `staleTime: "static"`: return cached data even if invalidated/stale; fetch only when data is missing.

It also applies an options-level `select` before returning.

Await queries required before rendering or routing; their failures reach the route error boundary. For best-effort background work, use `void queryClient.query(options).catch(noop)` because `query` does not swallow errors.

### Stale While Revalidate

To unblock navigation with cached data and then revalidate using the query's normal `staleTime`:

```typescript
import { noop } from "@tanstack/react-query";

loader: async ({ context }) => {
  await context.queryClient.query({
    ...todosQueryOptions(),
    staleTime: "static",
  });
  void context.queryClient.query(todosQueryOptions()).catch(noop);
},
```

Keep `staleTime: "static"` as a call-site override. Putting it in the reusable options would also prevent the second call from revalidating.

This is the `queryClient.query` equivalent of the deprecated `ensureQueryData({ revalidateIfStale: true })` behavior:

| Deprecated call                                            | Replacement                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `fetchQuery(options)`                                      | `query(options)`                                                  |
| `prefetchQuery(options)`                                   | `query(options).catch(noop)`                                      |
| `ensureQueryData(options)`                                 | `query({ ...options, staleTime: "static" })`                      |
| `ensureQueryData({ ...options, revalidateIfStale: true })` | Await a static read, then call `void query(options).catch(noop)`. |

Never use cached route data as a security decision. Authorization and destructive-operation checks belong in the server function or its middleware.

## Mutations

- Use `useMutation` with Start server functions. Prefer one round trip: return canonical affected data and write it to every exact cache that can be updated safely instead of issuing a follow-up read.
- Update caches immutably from the canonical server response, not assumptions about what the server stored.
- Invalidate only affected caches that cannot be reconstructed safely, such as aggregates or lists whose membership or order may change. Avoid broad invalidation and automatic refetching after every mutation.
- Use `router.invalidate()` only when route guards, redirects, or other route logic must rerun; await `router.invalidate({ sync: true })` when the next step depends on completion.
- An `onSuccess` cache write is response-driven, not optimistic. Use `onMutate` optimistic updates only for reversible, predictable changes: cancel matching queries, snapshot and update the cache, roll back on error, then reconcile with the server result.
- Do not optimistically apply destructive or security-sensitive mutations, server-generated identities, or complex multi-entity side effects.

## Server Boundaries

- Import `createServerFn` wrappers statically and prefix their names with `$` (for example, `$getUser`).
- Guard server-only logic with a server-function handler, `createServerOnlyFn`, a `*.server.*` file, or `import "@tanstack/react-start/server-only";`.
- Read secrets and server environment variables inside a per-request server boundary, never in a loader or at isomorphic module scope.
- Do not use relative `fetch("/api/...")` calls in isomorphic loaders. Call a Start server function, or construct an absolute URL inside an explicit server boundary when the HTTP boundary is required.
