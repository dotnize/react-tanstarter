import { useAuthSuspense } from "@repo/auth/tanstack/hooks";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { SignOutButton } from "~/components/sign-out-button";
import { ThemeToggle } from "~/components/theme-toggle";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 p-2">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">TanStarter</h1>
        <div className="flex items-center gap-2 text-sm text-foreground/80 max-sm:flex-col">
          This is an unprotected page:
          <pre className="rounded-md border bg-card p-1 text-card-foreground">routes/index.tsx</pre>
        </div>
      </div>

      <Suspense fallback={<div className="py-6">Loading user...</div>}>
        <UserAction />
      </Suspense>

      <div className="flex flex-col items-center gap-2">
        <p className="text-foreground/80 max-sm:text-xs">
          A monorepo template for{" "}
          <a
            className="group text-foreground"
            href="https://tanstack.com/start/latest"
            target="_blank"
            rel="noreferrer noopener"
          >
            🏝️ <span className="group-hover:underline">TanStack Start</span>
          </a>{" "}
          with Turborepo.
        </p>
        <div className="flex items-center gap-3">
          <a
            className="text-foreground/80 underline hover:text-foreground max-sm:text-sm"
            href="https://github.com/dotnize/react-tanstarter"
            target="_blank"
            title="Template repository on GitHub"
            rel="noreferrer noopener"
          >
            dotnize/react-tanstarter
          </a>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function UserAction() {
  const { user } = useAuthSuspense();

  return user ? (
    <div className="flex flex-col items-center gap-2">
      <p>Welcome back, {user.name}!</p>
      <Button
        render={<Link to="/dashboard" />}
        className="mb-2 w-fit"
        size="lg"
        nativeButton={false}
      >
        Go to Dashboard
      </Button>
      <div className="text-center text-xs sm:text-sm">
        Session user:
        <pre className="max-w-screen overflow-x-auto px-2 text-start">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <SignOutButton />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <p>You are not signed in.</p>
      <Button render={<Link to="/login" />} className="w-fit" size="lg" nativeButton={false}>
        Log in
      </Button>
    </div>
  );
}
