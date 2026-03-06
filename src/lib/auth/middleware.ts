import { createMiddleware } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

import { _getUser } from "@/lib/auth/functions";

// https://tanstack.com/start/latest/docs/framework/react/guide/middleware
// These are example middlewares that you can modify and use in your server functions or routes.

/**
 * Middleware to force authentication on server requests (including server functions), and add the user to the context.
 *
 * Follows the cookieCache option in the auth config (template default: 5 mins). This is recommended for most cases, like route-level data fetching operations where some staleness may be acceptable and reduced server load is beneficial.
 *
 * @see https://better-auth.com/docs/concepts/session-management#cookie-cache
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await _getUser();

  if (!user) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({ context: { user } });
});

/**
 * Middleware to force authentication on server requests (including server functions), and add the user to the context.
 *
 * Auth cookie cache is disabled, and fresh user session is always fetched from database. This is recommended for sensitive/destructive operations and mutations that require the freshest auth state, e.g. to prevent a user from performing an action after their session has expired or been revoked.
 *
 * @see https://better-auth.com/docs/concepts/session-management#cookie-cache
 */
export const freshAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await _getUser({
    // ensure session is fresh
    // https://better-auth.com/docs/concepts/session-management#cookie-cache
    disableCookieCache: true,
  });

  if (!user) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({ context: { user } });
});
