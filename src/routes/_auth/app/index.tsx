import { SignOutButton } from "@/components/sign-out-button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/app/")({
  component: AppIndex,
});

function AppIndex() {
  const { user } = Route.useRouteContext();
  // we can also use the useAuth() or useAuthSuspense() hooks here from ~/lib/auth/hooks
  // this is just to demo that route context is available in route components, in addition to loaders/beforeLoad

  return (
    <div className="flex flex-col items-center gap-1">
      App index page
      <pre className="bg-card text-card-foreground rounded-md border p-1 text-xs">
        routes/_auth/app/index.tsx
      </pre>
      <div className="mt-2 text-center text-xs sm:text-sm">
        User data from route context:
        <pre className="max-w-screen overflow-x-auto px-2 text-start">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <SignOutButton />
    </div>
  );
}
