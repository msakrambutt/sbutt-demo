import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";

export const usertable = pgTable("users", {
  id: varchar("id",{
    length: 255,
  }).notNull(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  }).notNull(),
  password: varchar("password", {
    length: 255,
  }).notNull(),

}
);

export type Users=InferModel<typeof usertable >;
export type NewUsers=InferModel<typeof usertable,"insert" >;


export const db = drizzle(sql);
