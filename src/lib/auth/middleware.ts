import { createMiddleware } from "@tanstack/react-start";
import { getRequest, setResponseStatus } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

// https://tanstack.com/start/latest/docs/framework/react/guide/middleware
// This is just an example middleware that you can modify and use in your server functions or routes.

/**
 * Middleware to force authentication on server requests (including server functions), and add the user to the context.
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: getRequest().headers,
    query: {
      // ensure session is fresh
      // https://www.better-auth.com/docs/concepts/session-management#session-caching
      disableCookieCache: true,
    },
  });

  if (!session) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({ context: { user: session.user } });
});
