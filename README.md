# [TanStarter](https://github.com/mugnavo/tanstarter)

> [!TIP]
> We're working on a monorepo version of this template with Turborepo. See the [`next` branch](https://github.com/mugnavo/tanstarter/tree/next) if you want to try it out. ([#45](https://github.com/mugnavo/tanstarter/pull/45))

A minimal starter template for 🏝️ TanStack Start. [→ Preview here](https://tanstarter.mugnavo.com/)

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)
- [Vite 8](https://vite.dev/blog/announcing-vite8-beta) (beta) + [Nitro v3](https://v3.nitro.build/) (nightly)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- [Better Auth](https://www.better-auth.com/)

## Getting Started

1. [Use this template](https://github.com/new?template_name=tanstarter&template_owner=mugnavo) or clone this repository with gitpick:

   ```bash
   npx gitpick mugnavo/tanstarter myapp
   cd myapp
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example).

4. Push the schema to your database with drizzle-kit:

   ```bash
   pnpm db push
   ```

   https://orm.drizzle.team/docs/migrations

5. Run the development server:

   ```bash
   pnpm dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

## Deploying to production

[![Netlify Status](https://api.netlify.com/api/v1/badges/66acdee6-8e42-436f-9943-a67cad998f63/deploy-status)](https://app.netlify.com/projects/react-tanstarter/deploys)

The [vite config](./vite.config.ts#L12-L13) is currently configured to use Nitro v3 to deploy on Netlify, but supports many other [deployment presets](https://v3.nitro.build/deploy) like Vercel and Node.

While Nitro provides a great multi-provider default, the official [@netlify/vite-plugin-tanstack-start](https://www.npmjs.com/package/@netlify/vite-plugin-tanstack-start) is also available for Netlify deployments.

Refer to the [TanStack Start hosting docs](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for deploying to other platforms.

## Issue watchlist

- [Router/Start issues](https://github.com/TanStack/router/issues) - TanStack Start is in RC.
- [Devtools releases](https://github.com/TanStack/devtools/releases) - TanStack Devtools is in alpha and may still have breaking changes.
- [Vite 8 beta](https://vite.dev/blog/announcing-vite8-beta) - We're using Vite 8 beta which is powered by Rolldown.
- [Nitro v3 nightly](https://v3.nitro.build/docs/nightly) - The template is configured with Nitro v3 nightly by default.

## Goodies

#### Scripts

We use **pnpm** by default, but you can modify these scripts in [package.json](./package.json) to use your preferred package manager.

- **`auth:generate`** - Regenerate the [auth db schema](./src/lib/db/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./src/lib/auth/auth.ts).
- **`db`** - Run [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) commands. (e.g. `pnpm db generate`, `pnpm db studio`)
- **`ui`** - The shadcn/ui CLI. (e.g. `pnpm ui add button`)
- **`format`**, **`lint`**, **`check-types`** - Run Prettier, ESLint, and check TypeScript types respectively.
  - **`check`** - Run all three above. (e.g. `pnpm check`)
- **`deps`** - Selectively upgrade dependencies via taze.

#### Utilities

- [`auth/middleware.ts`](./src/lib/auth/middleware.ts) - Sample middleware for forcing authentication on server functions. (see [#5](https://github.com/mugnavo/tanstarter/issues/5#issuecomment-2615905686) and [#17](https://github.com/mugnavo/tanstarter/issues/17#issuecomment-2853482062))
- [`theme-toggle.tsx`](./src/components/theme-toggle.tsx), [`theme-provider.tsx`](./src/components/theme-provider.tsx) - A theme toggle and provider for toggling between light and dark mode. ([#7](https://github.com/mugnavo/tanstarter/issues/7#issuecomment-3141530412))

## License

Code in this template is public domain via [Unlicense](./LICENSE). Feel free to remove or replace for your own project.

## Also check out

- [TanStack CLI & MCP](https://tanstack.com/cli/latest) - The official CLI, MCP server, and AI toolkit for TanStack. Create and customize TanStack Start apps, search docs, integrate with AI agents, and more.
- [awesome-tanstack-start](https://github.com/Balastrong/awesome-tanstack-start) - A curated list of awesome resources for TanStack Start.
- [shadcn/ui Directory](https://ui.shadcn.com/docs/directory), [MCP](https://ui.shadcn.com/docs/mcp), [shoogle.dev](https://shoogle.dev/) - Component directories & registries for shadcn/ui.
