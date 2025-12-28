import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/generated",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL || "",
  },
});