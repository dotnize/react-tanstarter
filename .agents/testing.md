# Testing

## Purpose

Tests are a fast validation layer for behavior that is difficult or risky to verify by reading alone. Keep test effort proportional to business risk; there is no coverage target.

## What to Test

- Use Node-mode Vitest for pure domain rules, validation, authorization decisions, meaningful transformations, shared contracts, and regression-prone bug fixes.
- Use a local integration test when multiple owned modules or a real disposable local dependency must cooperate. Isolate its data and never use remote or production databases.
- Use Playwright for critical user journeys that unit tests cannot validate, such as auth entry points or multi-step onboarding.
- Keep TanStack server functions thin. Extract deterministic domain or handler logic and test it directly instead of recreating the TanStack Start request context in unit tests.

Usually do not test generated route discovery, routine navigation, static markup, shadcn primitives, trivial wrappers, implementation details, or framework behavior. Route tests are justified when custom search parsing, guards, redirects, or error behavior is itself product logic.

## Test Design

- Test public behavior and meaningful outcomes, not internal call structure.
- Prefer a few focused happy-path, boundary, failure, and regression cases. Table-driven tests are useful when the same contract has several inputs.
- Prefer real implementations when they are local, fast, deterministic, and side-effect free. Do not add mocks by default.
- Do not use snapshots or add tests solely to increase coverage.

Routine tests must not call third-party services. Keep external access behind a narrow boundary and use local provider fixtures when a critical integration requires representative data. For billing, test owned calculations and webhook handling locally; reserve the provider's official sandbox for a separate, explicitly invoked integration path.

## Conventions and Commands

- Colocate Vitest tests with source code as `*.test.ts` or `*.test.tsx`. Put Playwright tests under `e2e/` as `*.spec.ts`. Do not create a `__tests__` directory unless a feature has enough test-only files to justify grouping them.
- Import Vitest APIs from `vite-plus/test`.
- `vpr test`: Run all Vitest unit and local integration tests once.
- `vpr test watch`: Run the Vitest suite in watch mode.
- `vp exec playwright install chromium`: Install the E2E browser once per machine.
- `vpr test:e2e`: Build the app and run its E2E suite against the built production server.

Playwright must exercise built production output so the E2E path validates the deployable artifact, including production bundling and server/client boundaries. The Playwright configuration owns its build and server lifecycle; do not run a separate build first or reuse a development server. Use a targeted Playwright spec when iterating if the full E2E suite becomes slow.

Run the narrowest relevant test after changing behavior. Run Playwright whenever a change affects a covered browser journey; it remains separate from the default lint/check loop so unrelated changes stay fast.
