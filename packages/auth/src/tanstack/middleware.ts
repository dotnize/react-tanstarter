import { createMiddleware } from "@tanstack/react-start";
import {
  getRequest,
  setResponseHeader,
  setResponseStatus,
} from "@tanstack/react-start/server";
import { auth } from "../auth";

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
    returnHeaders: true,
  });

  // Forward any Set-Cookie headers to the client, e.g. for session/cache refresh
  const cookies = session.headers?.getSetCookie();
  if (cookies?.length) {
    setResponseHeader("Set-Cookie", cookies);
  }

  if (!session?.response?.user) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({ context: { user: session.response.user } });
});
