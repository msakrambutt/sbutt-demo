import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const table = pgTable("cartone", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", {
    length: 255,
  }).notNull(),
  product_id: varchar("product_id", {
    length: 255,
  }).notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),

});

export const db = drizzle(sql);
