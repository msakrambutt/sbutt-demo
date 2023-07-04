import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
//please not change userTable instead of users
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";

export const userTable = pgTable("users", {
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
  created_at: timestamp("created_at").notNull(),
  role: varchar("role", { length: 30 }).notNull().default("user"),
});

export const playlistTable = pgTable("playlist", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  order_date: timestamp("order_date").notNull(),
  course_id: varchar("course_id", {
    length: 255,
  }).notNull(),
});

export const watchTimeTable = pgTable("watch_time", {
  id: serial("id").primaryKey(),
  playlist_id: integer("playlist_id")
    .notNull()
    .references(() => playlistTable.id),
  watch_video_no: integer("watch_video_no").notNull(),
  watch_video_id: varchar("watch_video_id", {
    length: 255,
  }).notNull(),
});

export const  ForgetPwd=pgTable("forgetpwd",{
  user_email:varchar("user_email",{
    length:255,
  }).notNull(),
  user_token:varchar("user_token",{
    length:255,
  }).notNull(),
})

export type Users = InferModel<typeof userTable>;
export type NewUsers = InferModel<typeof userTable, "insert">;

export type Playlist = InferModel<typeof playlistTable>;
export type NewPlaylist = InferModel<typeof playlistTable, "insert">;

export type WatchTime = InferModel<typeof watchTimeTable>;
export type NewWatchTime = InferModel<typeof watchTimeTable, "insert">;

export type ForgetPwd = InferModel<typeof forgetPwd>;
export type NewoFrgetPwd = InferModel<typeof forgetPwd, "insert">;



export const db = drizzle(sql);
