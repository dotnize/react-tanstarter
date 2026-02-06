import { Button } from "@repo/ui/components/button";
import { Link } from "@tanstack/react-router";

export function DefaultNotFound() {
  return (
    <div className="space-y-2 p-2">
      <p>The page you are looking for does not exist.</p>
      <p className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => window.history.back()}>
          Go back
        </Button>
        <Button render={<Link to="/" />} variant="secondary" nativeButton={false}>
          Home
        </Button>
      </p>
    </div>
  );
}
