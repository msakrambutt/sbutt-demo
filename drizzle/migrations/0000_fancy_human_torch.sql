CREATE TABLE IF NOT EXISTS "playlist" (
	"_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"order_date" timestamp NOT NULL,
	"course_id" varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL
);

CREATE TABLE IF NOT EXISTS "watched_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"playlist_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"watch_duration" integer,
	"last_watched_position" integer,
	"video_no" integer NOT NULL,
	"video_id" integer NOT NULL,
	"is_completed" boolean,
	"watched_date" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "playlist" ADD CONSTRAINT "playlist_user_id_users__id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "watched_videos" ADD CONSTRAINT "watched_videos_playlist_id_playlist__id_fk" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "watched_videos" ADD CONSTRAINT "watched_videos_user_id_users__id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
