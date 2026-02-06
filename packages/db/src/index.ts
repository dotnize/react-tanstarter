import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";

import * as schemas from "./schema";
import { relations } from "./schema/relations";

const { relations: authRelations, ...schema } = schemas;

export function getDb() {
  return drizzle(env.db, {
    schema,
    // authRelations must come first, since it's using defineRelations as the main relation
    // https://orm.drizzle.team/docs/relations-v2#relations-parts
    relations: { ...authRelations, ...relations },
    casing: "snake_case",
  });
}
