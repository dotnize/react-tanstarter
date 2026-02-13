import type { Config } from "drizzle-kit";

export default {
  out: "./migrations",
  schema: "./src/schema/index.ts",
  breakpoints: true,
  verbose: true,
  strict: true,
  casing: "snake_case",

  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SERVER_DATABASE_URL as string,
  },
} satisfies Config;
