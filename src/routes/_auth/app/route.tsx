import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { SignOutButton } from "#/components/sign-out-button";
import { ThemeToggle } from "#/components/theme-toggle";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_auth/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 px-2">
      <div className="flex w-full max-w-3xl justify-between">
        <div className="flex items-center gap-1">
          <Button render={<Link to="/" />} size="sm" nativeButton={false}>
            back to home
          </Button>
          <span className="rounded-md border bg-card p-1 font-mono text-xs text-card-foreground">
            _auth/app/route.tsx
          </span>
        </div>
        <ThemeToggle />
      </div>
      <div className="w-full max-w-3xl rounded-md border p-2">
        <Outlet />
      </div>

      <div className="flex w-full max-w-3xl flex-wrap justify-between gap-2 text-sm">
        <div className="flex flex-col gap-0.5">
          what's next? maybe a sidebar?
          <span className="rounded-md border bg-card px-2 py-1 font-mono text-xs text-card-foreground">
            vpr ui add sidebar
          </span>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
}
