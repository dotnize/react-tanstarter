import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 p-2">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold sm:text-4xl">Dashboard Layout</h1>
        <pre className="bg-card text-card-foreground mb-4 rounded-md border p-1 text-xs">
          routes/_auth/dashboard/route.tsx
        </pre>
        <div className="text-foreground/80 mb-4 flex flex-col items-center gap-2 text-sm">
          This is a protected layout from the _auth pathless layout route:
          <pre className="bg-card text-card-foreground rounded-md border p-1 text-xs">
            routes/_auth/route.tsx
          </pre>
        </div>

        <Button render={<Link to="/" />} className="w-fit" size="lg" nativeButton={false}>
          Back to home
        </Button>
      </div>

      <Outlet />
    </div>
  );
}
