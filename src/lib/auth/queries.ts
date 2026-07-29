import { queryOptions } from "@tanstack/react-query";

import { $getUser } from "./functions";

/**
 * This query is mainly used in _auth/route.tsx, which is the _auth layout
 * that protects all child routes under it (e.g. _auth/app/*)
 */
export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["auth"],
    queryFn: ({ signal }) => $getUser({ signal }),
  });
