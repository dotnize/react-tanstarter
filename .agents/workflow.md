# Workflow

## Build Commands

- `pnpm build`: Only for build/bundler issues or verifying production output
- `pnpm lint`: Type-checking & type-aware linting
- `pnpm dev` runs indefinitely in watch mode
- `pnpm db` for Drizzle Kit commands (e.g. `pnpm db generate` to generate a migration)

Don't build after every change. If lint passes; assume changes work.

## TanStack CLI

Use `pnpm dlx @tanstack/cli` to look up TanStack documentation. Always pass `--json` for machine-readable output.

```bash
# List TanStack libraries (optionally filter by --group state|headlessUI|performance|tooling)
pnpm dlx @tanstack/cli libraries --json

# Fetch a specific doc page
pnpm dlx @tanstack/cli doc router framework/react/guide/data-loading --json
pnpm dlx @tanstack/cli doc query framework/react/overview --docs-version v5 --json

# Search docs (optionally filter by --library, --framework, --limit)
pnpm dlx @tanstack/cli search-docs "server functions" --library start --json
pnpm dlx @tanstack/cli search-docs "loaders" --library router --framework react --json
```

## Testing

No testing framework is currently set up. Prefer lint checks for now.

## Formatting

Oxfmt is configured for consistent code formatting via `pnpm format`. It runs automatically on commit via Husky pre-commit hooks, so manual formatting is not necessary.
