import { createAuthClient } from "better-auth/react";

import { env } from "#/env/client.ts";

/**
 * https://better-auth.com/docs/concepts/client
 *
 * Our better-auth server instance lives in the TanStack Start server,
 * so authClient should only be used on the client (event handlers, effects, etc).
 *
 * For server/SSR operations, prefer `auth.api` instead, and wrap in a serverFn if needed.
 */
export const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,
});
