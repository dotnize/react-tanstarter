import { env } from "@/env/server";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/lib/db/schema";

const client = postgres(env.DATABASE_URL);

const getDatabase = createServerOnlyFn(() =>
  drizzle({
    client,
    schema,
    casing: "snake_case",
  }),
);

export const db = getDatabase();
