import "@tanstack/react-start/server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schemas from "./schema";
import { relations } from "./schema/relations";

const { relations: authRelations, ...schema } = schemas;

const client = postgres(process.env.SERVER_DATABASE_URL as string);

export const db = drizzle({
  client,
  schema,
  // authRelations must come first, since it's using defineRelations as the main relation
  // https://orm.drizzle.team/docs/relations-v2#relations-parts
  relations: { ...authRelations, ...relations },
  casing: "snake_case",
});
