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

  export const playlistTable = pgTable("playlist", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usertable.id),
    order_date: date("order_date").notNull(),
    course_id: varchar("course_id", {
      length: 255,
    }).notNull(),
  });
  
  export const watchTimeTable = pgTable("watch_time", {
    id: serial("id").primaryKey(),
    playlist_id: integer("playlist_id").notNull().references(() => playlistTable.id),
    watch_video_no: integer("watch_video_no").notNull(),
    watch_video_id: varchar("watch_video_id", {
      length: 255,
    }).notNull(),
  });

export type Users=InferModel<typeof usertable >;
export type NewUsers=InferModel<typeof usertable,"insert" >;

export type Playlist = InferModel<typeof playlistTable>;
export type NewPlaylist = InferModel<typeof playlistTable, "insert">;

export type WatchTime = InferModel<typeof watchTimeTable>;
export type NewWatchTime = InferModel<typeof watchTimeTable, "insert">;


export const db = drizzle(sql);




