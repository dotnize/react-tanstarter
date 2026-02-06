// This script flattens Drizzle Kit v1 migrations for Cloudflare D1
// It moves apps/web/migrations/<folder>/migration.sql to apps/web/migrations/<folder>.sql
// Issue: https://github.com/drizzle-team/drizzle-orm/issues/5166

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(scriptDir, "..", "apps", "web", "migrations");

async function pathExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await pathExists(migrationsDir))) {
    console.error(`Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }

  const entries = await fs.readdir(migrationsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const dirName = entry.name;
    if (dirName === "meta") continue;

    const dirPath = path.join(migrationsDir, dirName);
    const migrationFile = path.join(dirPath, "migration.sql");

    if (await pathExists(migrationFile)) {
      const targetFile = path.join(migrationsDir, `${dirName}.sql`);
      console.log(`Moving ${migrationFile} to ${targetFile}`);
      await fs.rm(targetFile, { force: true });
      await fs.rename(migrationFile, targetFile);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
