import { date, integer, pgTable, serial, varchar,PgDate} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";

export const usertable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", {
      length: 255,
    }).notNull(),
    email: varchar("email", {
      length: 255,
    }).notNull(),
    password: varchar("password", {
      length: 255,
    }).notNull(),
    created_at: date("created_at",{mode:"date"}).notNull(),
    role: varchar("role", {
        length: 30,
      }).notNull().default("'user'"),
  });

export type Users=InferModel<typeof usertable >;
export type NewUsers=InferModel<typeof usertable,"insert" >;


export const db = drizzle(sql);




