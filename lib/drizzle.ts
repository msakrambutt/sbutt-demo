import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";
export const users = pgTable("users", {
  _id: serial("_id").primaryKey(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  }).notNull(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
  created_at: timestamp("created_at").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
});

export const playlist = pgTable("playlist", {
  _id: serial("_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users._id),
  order_date: timestamp("order_date").notNull(),
  course_id: varchar("course_id", {
    length: 255,
  }).notNull(),
});

export const watched_time = pgTable("watched_time", {
  _id: serial("_id").primaryKey(),
  playlist_id: integer("playlist_id")
    .notNull()
    .references(() => playlist._id),
  watch_video_no: integer("watch_video_no").notNull(),
  watch_video_id: varchar("watch_video_id", {
    length: 255,
  }).notNull(),
  completed: boolean("completed").default(false),
});

export const certificate=pgTable("certificate_issue",{
  _id: serial("_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users._id),
  course_id:integer("course_id").notNull(),
  completion_date:timestamp("completion_date").notNull(),
  certificate_issued_date:timestamp("certificate_issued_date").notNull(),
});

export const  ForgetPwd=pgTable("forgetpwd",{
  user_email:varchar("user_email",{
    length:255,
  }).notNull(),
  user_token:varchar("user_token",{
    length:255,
  }).notNull(),
});

export type Users = InferModel<typeof users>;
export type NewUsers = InferModel<typeof users, "insert">;

export type Playlist = InferModel<typeof playlist>;
export type NewPlaylist = InferModel<typeof playlist, "insert">;

export type certificate = InferModel<typeof certificate>;
export type Newcertificate = InferModel<typeof certificate, "insert">;

export type WatchTime = InferModel<typeof watched_time>;
export type NewWatchTime = InferModel<typeof watched_time, "insert">;


export type ForgetPwd = InferModel<typeof ForgetPwd>;
export type NewFrgetPwd = InferModel<typeof ForgetPwd, "insert">;


// export const db = drizzle(sql);

