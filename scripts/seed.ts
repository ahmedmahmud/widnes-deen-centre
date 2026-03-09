#!/usr/bin/env bun
/**
 * Unified seed script for Widnes Deen Centre CMS.
 *
 * Sets up everything needed for a fresh deployment:
 *   1. Runs Drizzle migrations (creates/updates all DB tables)
 *   2. Creates the admin user
 *   3. Creates the landing page + initial version (if missing)
 *   4. Uploads placeholder images to S3 and seeds media rows
 *   5. Links media to the landing page version(s)
 *
 * Idempotent — safe to run multiple times.
 *
 * Required env vars (set in .env.local or .env):
 *   DATABASE_URL   — Postgres connection string
 *   S3_ENDPOINT    — S3-compatible endpoint
 *   S3_BUCKET      — bucket name
 *   S3_ACCESS_KEY  — access key
 *   S3_SECRET_KEY  — secret key
 *   S3_REGION      — region (default: us-east-1)
 *
 * Optional env vars:
 *   ADMIN_USERNAME — default: "admin"
 *   ADMIN_PASSWORD — default: "admin1234"
 *
 * Usage:
 *   bun run seed
 *   # or directly:
 *   bun run scripts/seed.ts
 */
import { config } from "dotenv";
import { execSync } from "node:child_process";

config({ path: [".env.local", ".env"] });

/* ── Step 1: Run Drizzle migrations ── */

console.log("\n=== Step 1/5: Running database migrations ===\n");
try {
  execSync("bunx drizzle-kit migrate", { stdio: "inherit" });
  console.log("Migrations complete.");
} catch (err) {
  console.error("Migration failed:", err);
  process.exit(1);
}

/* ── Step 2: Seed admin user ── */

console.log("\n=== Step 2/5: Seeding admin user ===\n");

const { db } = await import("../src/db/index");
const { adminUsers, mediaItems, versionMedia } =
  await import("../src/db/schema");

const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
const adminPassword = process.env.ADMIN_PASSWORD ?? "admin1234";

const existingAdmin = await db.query.adminUsers.findFirst({
  where: (table, { eq }) => eq(table.username, adminUsername),
});

if (existingAdmin) {
  console.log(`Admin user "${adminUsername}" already exists — skipping.`);
} else {
  await db
    .insert(adminUsers)
    .values({ username: adminUsername, password: adminPassword });
  console.log(`Created admin user "${adminUsername}".`);
}

/* ── Step 3: Ensure landing page exists ── */

console.log("\n=== Step 3/5: Ensuring landing page exists ===\n");

const { eq } = await import("drizzle-orm");
const { pages, pageVersions, jamaatTimes } = await import("../src/db/schema");
const { defaultPageContent } = await import("../src/lib/cms/default-content");

const LANDING_SLUG = "landing";

const existingPage = await db.query.pages.findFirst({
  where: (table, { eq }) => eq(table.slug, LANDING_SLUG),
});

let landingPage: typeof existingPage;

if (existingPage) {
  console.log(`Landing page already exists (id: ${existingPage.id}) — skipping.`);
  landingPage = existingPage;
} else {
  const [created] = await db
    .insert(pages)
    .values({ slug: LANDING_SLUG, title: "Landing" })
    .returning();

  const [version] = await db
    .insert(pageVersions)
    .values({
      pageId: created.id,
      label: "Initial",
      content: defaultPageContent,
    })
    .returning();

  await db.insert(jamaatTimes).values(
    defaultPageContent.jamaatTimes.map((time) => ({
      versionId: version.id,
      name: time.name,
      kind: time.kind,
      time: time.time ?? null,
      offsetMinutes: time.offsetMinutes ?? null,
    })),
  );

  await db
    .update(pages)
    .set({ publishedVersionId: version.id })
    .where(eq(pages.id, created.id));

  console.log(`Created landing page (id: ${created.id}) with initial version.`);
  landingPage = created;
}

console.log(`Landing page ready (id: ${landingPage!.id}).`);

/* ── Step 4: Upload placeholder images to S3 ── */

console.log("\n=== Step 4/5: Uploading placeholder images to S3 ===\n");

const { SEED_MEDIA } = await import("../src/lib/cms/default-content");
const { mediaStorage } = await import("../src/lib/media-storage");

function makePlaceholderSvg(label: string, hue: number): Uint8Array {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="hsl(${hue}, 25%, 25%)"/>
  <text x="400" y="280" text-anchor="middle" font-family="system-ui,sans-serif" font-size="32" fill="hsl(${hue}, 30%, 70%)">${label}</text>
  <text x="400" y="330" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" fill="hsl(${hue}, 20%, 55%)">Placeholder — replace in CMS</text>
</svg>`;
  return new TextEncoder().encode(svg);
}

const SEEDS = [
  {
    id: SEED_MEDIA.mainEntrance,
    filename: "seed-main-entrance.svg",
    label: "Main Entrance",
    hue: 200,
  },
  {
    id: SEED_MEDIA.prayerHall,
    filename: "seed-prayer-hall.svg",
    label: "Prayer Hall",
    hue: 160,
  },
  {
    id: SEED_MEDIA.communitySpace,
    filename: "seed-community-space.svg",
    label: "Community Space",
    hue: 40,
  },
  {
    id: SEED_MEDIA.courtyard,
    filename: "seed-courtyard.svg",
    label: "Courtyard",
    hue: 120,
  },
];

const mediaRows: Array<{
  id: string;
  filename: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
}> = [];

for (const seed of SEEDS) {
  const buffer = makePlaceholderSvg(seed.label, seed.hue);
  const stored = await mediaStorage.upload({
    buffer,
    filename: seed.filename,
    mimeType: "image/svg+xml",
  });
  console.log(`  Uploaded ${seed.filename} -> ${stored.publicUrl}`);
  mediaRows.push({
    id: seed.id,
    filename: seed.filename,
    storagePath: stored.publicUrl,
    mimeType: "image/svg+xml",
    sizeBytes: stored.sizeBytes,
  });
}

console.log("Inserting media rows into database...");

for (const row of mediaRows) {
  await db
    .insert(mediaItems)
    .values({
      id: row.id,
      filename: row.filename,
      originalFilename: row.filename,
      storagePath: row.storagePath,
      mimeType: row.mimeType,
      sizeBytes: row.sizeBytes,
      status: "active",
    })
    .onConflictDoUpdate({
      target: mediaItems.id,
      set: {
        filename: row.filename,
        storagePath: row.storagePath,
        mimeType: row.mimeType,
        sizeBytes: row.sizeBytes,
      },
    });
}

console.log(`Inserted/updated ${mediaRows.length} media items.`);

/* ── Step 5: Link media to landing page versions ── */

console.log("\n=== Step 5/5: Linking media to landing page versions ===\n");

const page = await db.query.pages.findFirst({
  where: (table, { eq }) => eq(table.slug, "landing"),
});

if (!page) {
  console.error("Landing page not found — aborting.");
  process.exit(1);
}

const versions = await db.query.pageVersions.findMany({
  where: (table, { eq }) => eq(table.pageId, page.id),
});

for (const version of versions) {
  for (const row of mediaRows) {
    await db
      .insert(versionMedia)
      .values({ versionId: version.id, mediaId: row.id })
      .onConflictDoNothing();
  }
}

console.log(
  `Linked media to ${versions.length} version(s).`,
);

console.log("\n=== Seed complete! ===\n");
console.log(`  Admin login:  ${adminUsername} / ${adminPassword}`);
console.log(`  S3 bucket:    ${process.env.S3_BUCKET}`);
console.log(`  S3 endpoint:  ${process.env.S3_ENDPOINT}`);
console.log(`  Database:     ${process.env.DATABASE_URL}`);
console.log("");

process.exit(0);
