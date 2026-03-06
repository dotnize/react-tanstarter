import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/_auth")({
  component: Outlet,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (!user) {
      throw redirect({ to: "/login" });
    }

    // return context for use in child routes & loaders
    return { user };
  },
});
