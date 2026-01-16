/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { authQueryOptions, type AuthQueryResult } from "~/lib/auth/queries";
import appCss from "~/styles.css?url";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";

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
        title: "React TanStarter",
      },
      {
        name: "description",
        content: "A minimal starter template for 🏝️ TanStack Start.",
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
    // suppress since we're updating the "dark" class in ThemeProvider
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
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
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
