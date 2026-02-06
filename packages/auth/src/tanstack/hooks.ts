import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { authQueryOptions } from "./queries";

export function useAuth() {
  const { data: user, isPending } = useQuery(authQueryOptions());
  return { user, isPending };
}

export function useAuthSuspense() {
  const { data: user, isPending } = useSuspenseQuery(authQueryOptions());
  return { user, isPending };
}
