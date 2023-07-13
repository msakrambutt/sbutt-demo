ALTER TABLE "watched_videos" RENAME TO "watched_time";
ALTER TABLE "watched_time" RENAME COLUMN "video_no" TO "watch_video_no";
ALTER TABLE "watched_time" RENAME COLUMN "video_id" TO "watch_video_id";
ALTER TABLE "watched_time" DROP CONSTRAINT "watched_videos_playlist_id_playlist__id_fk";

ALTER TABLE "watched_time" DROP CONSTRAINT "watched_videos_user_id_users__id_fk";

DO $$ BEGIN
 ALTER TABLE "watched_time" ADD CONSTRAINT "watched_time_playlist_id_playlist__id_fk" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "watched_time" ADD CONSTRAINT "watched_time_user_id_users__id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "watched_time" DROP COLUMN IF EXISTS "watch_duration";
ALTER TABLE "watched_time" DROP COLUMN IF EXISTS "last_watched_position";
ALTER TABLE "watched_time" DROP COLUMN IF EXISTS "is_completed";
ALTER TABLE "watched_time" DROP COLUMN IF EXISTS "watched_date";