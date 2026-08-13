import "@tanstack/react-start/server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "#/env/server.ts";
import { authRelations } from "#/lib/db/schema/auth.schema.ts";
import { relations } from "#/lib/db/schema/relations.ts";

const client = postgres(env.DATABASE_URL);

export const db = drizzle({
  client,
  // authRelations uses defineRelationsPart,
  // so it must come after the main relations.
  // https://orm.drizzle.team/docs/relations-v2#relations-parts
  relations: { ...relations, ...authRelations },
});
