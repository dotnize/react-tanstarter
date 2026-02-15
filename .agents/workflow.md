# Workflow

## Build Commands

- `pnpm build`: Only for build/bundler issues or verifying production output
- `pnpm lint`: Check for code issues via ESLint
- `pnpm check-types`: TypeScript type checking
- `pnpm dev` runs indefinitely in watch mode
- `pnpm db` for Drizzle Kit commands (e.g. `pnpm db generate` to generate a migration)
- `pnpm format` for Prettier formatting & cleaning up imports. If necessary, only run after task batches.

Don't build after every change. If lint & type checks pass; assume changes work.

## Testing

No testing framework is currently set up. Prefer lint checks for now.
