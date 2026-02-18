import "@tanstack/react-start/server-only";

import { env } from "@/env/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/lib/db/schema";

const client = postgres(env.DATABASE_URL);

export const db = drizzle({
  client,
  schema,
  casing: "snake_case",
});
