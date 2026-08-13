# Workflow

## Commands

- `vpr build`: Only as a standalone command for build/bundler issues or verifying production output; `vpr test:e2e` performs its own production build
- `vpr lint`: Covers both type-aware linting and type checking. No need to run `tsc --noEmit`
- `vpr dev` runs indefinitely in watch mode
- `vpr db` for Drizzle Kit commands (e.g. `vpr db generate` to generate a migration)

Don't invoke a standalone build after every change. Use lint as the baseline and run the narrowest relevant tests described below; the E2E command builds when browser validation is relevant.

## Testing

- `vpr test`: Run all Vitest unit and local integration tests once
- `vpr test watch`: Run Vitest in watch mode
- `vpr test:e2e`: Build the app and run its local Chromium end-to-end tests against the built server
- `vp exec playwright install chromium`: Install the E2E browser once per machine

Run the narrowest tests relevant to the changed behavior. Playwright remains separate from the default lint/check loop; use it whenever a change affects a covered browser journey. Its configuration owns the production build and built-server lifecycle, so do not start a development server or run a separate build first. See [Testing](./testing.md) for test selection and design guidance.

## Formatting

Oxfmt (via Vite+) is configured for consistent code formatting via `vpr format`. It runs automatically on commit via Vite+ pre-commit hooks, so manual formatting is not necessary.
