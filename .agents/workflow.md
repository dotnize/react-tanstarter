# Workflow

## Build Commands

- `pnpm build`: Only for build/bundler issues or verifying production output
- `pnpm lint`: Type-checking & type-aware linting
- `pnpm dev` runs indefinitely in watch mode
- `pnpm db` for Drizzle Kit commands (e.g. `pnpm db generate` to generate a migration)

Don't build after every change. If lint passes; assume changes work.

## Testing

No testing framework is currently set up. Prefer lint checks for now.

## Formatting

Oxfmt is configured for consistent code formatting via `pnpm format`. It runs automatically on commit via Husky pre-commit hooks, so manual formatting is not necessary.
