import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial().primaryKey(),
    username: text().notNull().unique(),
    password: text().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    usernameIdx: uniqueIndex("admin_users_username_idx").on(table.username),
  }),
);

export const prayerName = pgEnum("prayer_name", [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
  "jummah",
]);

export const prayerTimeKind = pgEnum("prayer_time_kind", ["fixed", "sunset"]);

export const mediaStatus = pgEnum("media_status", ["active", "archived"]);

export const pages = pgTable("pages", {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  publishedVersionId: uuid("published_version_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pageVersions = pgTable(
  "page_versions",
  {
    id: uuid().defaultRandom().primaryKey(),
    pageId: integer("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    label: text(),
    content: jsonb().notNull(),
    scheduleMediaId: uuid("schedule_media_id"),
    createdByUserId: text("created_by_user_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pageIdIdx: index("page_versions_page_id_idx").on(table.pageId),
  }),
);

export const mediaItems = pgTable(
  "media_items",
  {
    id: uuid().defaultRandom().primaryKey(),
    filename: text().notNull(),
    originalFilename: text("original_filename").notNull(),
    storagePath: text("storage_path").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    width: integer(),
    height: integer(),
    altText: text("alt_text"),
    caption: text(),
    status: mediaStatus().default("active").notNull(),
    createdByUserId: text("created_by_user_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    storagePathIdx: uniqueIndex("media_items_storage_path_idx").on(
      table.storagePath,
    ),
    statusIdx: index("media_items_status_idx").on(table.status),
  }),
);

export const versionMedia = pgTable(
  "version_media",
  {
    id: serial().primaryKey(),
    versionId: uuid("version_id")
      .notNull()
      .references(() => pageVersions.id, { onDelete: "cascade" }),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => mediaItems.id, { onDelete: "restrict" }),
  },
  (table) => ({
    versionMediaIdx: uniqueIndex("version_media_unique_idx").on(
      table.versionId,
      table.mediaId,
    ),
  }),
);

export const jamaatTimes = pgTable(
  "jamaat_times",
  {
    id: serial().primaryKey(),
    versionId: uuid("version_id")
      .notNull()
      .references(() => pageVersions.id, { onDelete: "cascade" }),
    name: prayerName().notNull(),
    kind: prayerTimeKind().notNull(),
    time: text(),
    offsetMinutes: integer("offset_minutes"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    versionNameIdx: uniqueIndex("jamaat_times_version_name_idx").on(
      table.versionId,
      table.name,
    ),
  }),
);

export const sunsetCache = pgTable(
  "sunset_cache",
  {
    id: serial().primaryKey(),
    date: text().notNull(),
    latitude: text().notNull(),
    longitude: text().notNull(),
    sunsetUtc: timestamp("sunset_utc").notNull(),
    fetchedAt: timestamp("fetched_at").defaultNow(),
  },
  (table) => ({
    lookupIdx: uniqueIndex("sunset_cache_lookup_idx").on(
      table.date,
      table.latitude,
      table.longitude,
    ),
  }),
);
