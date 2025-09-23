import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequest().headers });

  return session?.user || null;
});
