import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "3252",
    database: "nd",
    ssl: false
  },
})