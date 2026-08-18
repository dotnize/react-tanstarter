import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { GalleryVerticalEndIcon } from "lucide-react";

import { authQueryOptions } from "#/lib/auth/queries.ts";

export const Route = createFileRoute("/_guest")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // Redirect path when user is already present,
    // or after successful login/signup
    const REDIRECT_URL = "/app";

    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }

    return {
      redirectUrl: REDIRECT_URL,
    };
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <Link
          to="/"
          aria-label="Acme Inc. home"
          className="mx-auto flex items-center gap-2 font-semibold tracking-tight"
        >
          <GalleryVerticalEndIcon className="size-6" aria-hidden="true" />
          Acme Inc.
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
