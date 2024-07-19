import { pgTable, uuid, timestamp, text, integer } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';


// users
export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "user">().default("user").notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).defaultNow()
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const items = pgTable("item", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).defaultNow()
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;



// sessions
export const sessions = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).defaultNow()
});

export type Session = typeof sessions.$inferSelect;



