/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  ScriptOnce,
  Scripts,
} from "@tanstack/react-router";

import { TanStackDevtools } from "@tanstack/react-devtools";
// import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { authQueryOptions, type AuthQueryResult } from "@repo/auth/tanstack/queries";
import appCss from "~/styles.css?url";

import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/lib/theme-provider";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: AuthQueryResult;
}>()({
  beforeLoad: ({ context }) => {
    // we're using react-query for client-side caching to reduce client-to-server calls, see /src/router.tsx
    // better-auth's cookieCache is also enabled server-side to reduce server-to-db calls, see /src/lib/auth/auth.ts
    context.queryClient.prefetchQuery(authQueryOptions());

    // typically we don't need the user immediately in landing pages,
    // so we're only prefetching here and not awaiting.
    // for protected routes with loader data, see /_auth/route.tsx
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStarter",
      },
      {
        name: "description",
        content: "A monorepo template for 🏝️ TanStack Start and Cloudflare.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    // suppress since we're updating the "dark" class in a custom script below
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>
          {/* Apply theme early to avoid FOUC */}
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        <ThemeProvider>
          {children}
          <Toaster richColors />
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            // formDevtoolsPlugin(),
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
