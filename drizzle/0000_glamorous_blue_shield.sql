CREATE TYPE "public"."media_status" AS ENUM('active', 'archived');--> statement-breakpoint
CREATE TYPE "public"."prayer_name" AS ENUM('fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jummah');--> statement-breakpoint
CREATE TYPE "public"."prayer_time_kind" AS ENUM('fixed', 'sunset');--> statement-breakpoint
CREATE TABLE "jamaat_times" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_id" uuid NOT NULL,
	"name" "prayer_name" NOT NULL,
	"kind" "prayer_time_kind" NOT NULL,
	"time" text,
	"offset_minutes" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "media_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" text NOT NULL,
	"original_filename" text NOT NULL,
	"storage_path" text NOT NULL,
	"mime_type" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"width" integer,
	"height" integer,
	"alt_text" text,
	"caption" text,
	"status" "media_status" DEFAULT 'active' NOT NULL,
	"created_by_user_id" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "page_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_id" integer NOT NULL,
	"label" text,
	"content" jsonb NOT NULL,
	"created_by_user_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"published_version_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sunset_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"latitude" text NOT NULL,
	"longitude" text NOT NULL,
	"sunset_utc" timestamp NOT NULL,
	"fetched_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "version_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_id" uuid NOT NULL,
	"media_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jamaat_times" ADD CONSTRAINT "jamaat_times_version_id_page_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."page_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_versions" ADD CONSTRAINT "page_versions_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "version_media" ADD CONSTRAINT "version_media_version_id_page_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."page_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "version_media" ADD CONSTRAINT "version_media_media_id_media_items_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media_items"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "jamaat_times_version_name_idx" ON "jamaat_times" USING btree ("version_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "media_items_storage_path_idx" ON "media_items" USING btree ("storage_path");--> statement-breakpoint
CREATE INDEX "media_items_status_idx" ON "media_items" USING btree ("status");--> statement-breakpoint
CREATE INDEX "page_versions_page_id_idx" ON "page_versions" USING btree ("page_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sunset_cache_lookup_idx" ON "sunset_cache" USING btree ("date","latitude","longitude");--> statement-breakpoint
CREATE UNIQUE INDEX "version_media_unique_idx" ON "version_media" USING btree ("version_id","media_id");