ALTER TABLE "watched_time" DROP CONSTRAINT "watched_time_user_id_users__id_fk";

ALTER TABLE "watched_time" DROP COLUMN IF EXISTS "user_id";