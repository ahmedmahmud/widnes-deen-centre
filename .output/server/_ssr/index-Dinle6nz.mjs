import { P as Pool } from "../_libs/pg.mjs";
import { d as drizzle, p as pgTable, t as timestamp, a as text, u as uuid, j as jsonb, i as integer, b as boolean, s as serial, c as pgEnum, f as uniqueIndex, g as index$1 } from "../_libs/drizzle-orm.mjs";
import "../_libs/react.mjs";
import "events";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "util";
import "crypto";
import "dns";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "net";
import "tls";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "path";
import "stream";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
const adminUsers = pgTable(
  "admin_users",
  {
    id: serial().primaryKey(),
    username: text().notNull().unique(),
    password: text().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => ({
    usernameIdx: uniqueIndex("admin_users_username_idx").on(table.username)
  })
);
const prayerName = pgEnum("prayer_name", [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
  "jummah"
]);
const prayerTimeKind = pgEnum("prayer_time_kind", ["fixed", "sunset"]);
const mediaStatus = pgEnum("media_status", ["active", "archived"]);
const pages = pgTable("pages", {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  publishedVersionId: uuid("published_version_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const pageVersions = pgTable(
  "page_versions",
  {
    id: uuid().defaultRandom().primaryKey(),
    pageId: integer("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
    label: text(),
    content: jsonb().notNull(),
    scheduleMediaId: uuid("schedule_media_id"),
    createdByUserId: text("created_by_user_id"),
    createdAt: timestamp("created_at").defaultNow()
  },
  (table) => ({
    pageIdIdx: index$1("page_versions_page_id_idx").on(table.pageId)
  })
);
const mediaItems = pgTable(
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
    status: mediaStatus().default("active").notNull(),
    createdByUserId: text("created_by_user_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
  },
  (table) => ({
    storagePathIdx: uniqueIndex("media_items_storage_path_idx").on(
      table.storagePath
    ),
    statusIdx: index$1("media_items_status_idx").on(table.status)
  })
);
const versionMedia = pgTable(
  "version_media",
  {
    id: serial().primaryKey(),
    versionId: uuid("version_id").notNull().references(() => pageVersions.id, { onDelete: "cascade" }),
    mediaId: uuid("media_id").notNull().references(() => mediaItems.id, { onDelete: "restrict" })
  },
  (table) => ({
    versionMediaIdx: uniqueIndex("version_media_unique_idx").on(
      table.versionId,
      table.mediaId
    )
  })
);
const jamaatTimes = pgTable(
  "jamaat_times",
  {
    id: serial().primaryKey(),
    versionId: uuid("version_id").notNull().references(() => pageVersions.id, { onDelete: "cascade" }),
    name: prayerName().notNull(),
    kind: prayerTimeKind().notNull(),
    time: text(),
    offsetMinutes: integer("offset_minutes"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
  },
  (table) => ({
    versionNameIdx: uniqueIndex("jamaat_times_version_name_idx").on(
      table.versionId,
      table.name
    )
  })
);
const sunsetCache = pgTable(
  "sunset_cache",
  {
    id: serial().primaryKey(),
    date: text().notNull(),
    latitude: text().notNull(),
    longitude: text().notNull(),
    sunsetUtc: timestamp("sunset_utc").notNull(),
    fetchedAt: timestamp("fetched_at").defaultNow()
  },
  (table) => ({
    lookupIdx: uniqueIndex("sunset_cache_lookup_idx").on(
      table.date,
      table.latitude,
      table.longitude
    )
  })
);
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  adminUsers,
  jamaatTimes,
  mediaItems,
  mediaStatus,
  pageVersions,
  pages,
  prayerName,
  prayerTimeKind,
  sunsetCache,
  versionMedia
}, Symbol.toStringTag, { value: "Module" }));
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool, { schema });
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  db
}, Symbol.toStringTag, { value: "Module" }));
export {
  pages as a,
  db as d,
  index as i,
  jamaatTimes as j,
  mediaItems as m,
  pageVersions as p,
  sunsetCache as s,
  versionMedia as v
};
