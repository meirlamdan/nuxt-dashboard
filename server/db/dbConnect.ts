import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export let db: any = null;

export async function connect() {
  if (db) {
    return db;
  }
  await client.connect();
  db = drizzle(client, { logger: true, schema });
}
