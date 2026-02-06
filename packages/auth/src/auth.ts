import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { getDb } from "@repo/db";
import * as schema from "@repo/db/schema";
import { createServerOnlyFn } from "@tanstack/react-start";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const getAuthConfig = createServerOnlyFn(() =>
  betterAuth({
    baseURL: process.env.VITE_BASE_URL,
    secret: process.env.SERVER_AUTH_SECRET,
    telemetry: {
      enabled: false,
    },
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema,
    }),

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [tanstackStartCookies()],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      google: {
        clientId: process.env.SERVER_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.SERVER_GOOGLE_CLIENT_SECRET!,
      },
    },

    // https://www.better-auth.com/docs/authentication/email-password
    emailAndPassword: {
      enabled: true,
    },

    experimental: {
      // https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
      joins: true,
    },
  }),
);

export const auth = getAuthConfig();
