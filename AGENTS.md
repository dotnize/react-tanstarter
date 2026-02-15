# Agent Guidelines

## Essentials

- Stack: TypeScript + React (TanStack Start) in a pnpm + Turborepo monorepo, with Drizzle ORM, shadcn/ui, and Better Auth.
- Prefer shared `@repo/ui` components; add primitives via shadcn CLI (`pnpm ui add <component>`).
- Use shared pnpm catalog versions (`pnpm-workspace.yaml`) via `catalog:`.
- Don't build after every little change. If `pnpm lint` passes; assume changes work.

## Topic-specific Guidelines

- [TanStack patterns](.agents/tanstack-patterns.md) - Routing, data fetching, loaders, server functions, environment shaking
- [Auth patterns](.agents/auth.md) - Route guards, middleware, auth utilities
- [TypeScript conventions](.agents/typescript.md) - Casting rules, prefer type inference
- [Workflow](.agents/workflow.md) - Workflow commands, validation approach
