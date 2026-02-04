import type { Config } from "drizzle-kit";

const {
  SERVER_LOCAL_DB_PATH,
  SERVER_CF_DB_ID,
  SERVER_CF_D1_TOKEN,
  SERVER_CF_ACCOUNT_ID,
} = process.env;

export default {
  out: "../../apps/web/migrations",
  schema: "./src/schema/index.ts",
  breakpoints: true,
  verbose: true,
  strict: true,
  casing: "snake_case",

  dialect: "sqlite",
  driver: SERVER_LOCAL_DB_PATH ? undefined : "d1-http",
  dbCredentials: SERVER_LOCAL_DB_PATH
    ? {
        url: SERVER_LOCAL_DB_PATH,
      }
    : {
        accountId: SERVER_CF_ACCOUNT_ID!,
        databaseId: SERVER_CF_DB_ID!,
        token: SERVER_CF_D1_TOKEN!,
      },
} satisfies Config;
