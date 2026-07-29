import { createFileRoute } from "@tanstack/react-router";

import { useAuthSuspense } from "#/lib/auth/hooks";

export const Route = createFileRoute("/_auth/app/")({
  component: AppIndex,
});

function AppIndex() {
  const { user } = useAuthSuspense();

  return (
    <div className="flex flex-col items-center gap-3 text-center text-sm">
      <pre className="mb-1 rounded-md border bg-card p-1 text-xs text-card-foreground">
        _auth/app/index.tsx
      </pre>

      <div>
        User from route context:
        <span className="mt-0.5 block font-mono text-xs">{user?.name}</span>
      </div>

      <div>
        <p>The /app index page, a protected route, since it is under the _auth layout:</p>
        <pre className="mx-auto mt-0.5 block w-fit rounded-md border bg-card p-1 text-xs text-card-foreground">
          _auth/route.tsx
        </pre>
      </div>
    </div>
  );
}
