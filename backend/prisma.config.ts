import { defineConfig } from "prisma/config";

const databaseUrl =
  (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }).process?.env?.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Falls back to an empty string so 'prisma generate' won't crash
    url: databaseUrl,
  },
});