/**
 * Seed script: inserts the 4 default media items and updates the landing page
 * content to reference them. Run with: bun run scripts/seed-media.ts
 *
 * Idempotent — safe to run multiple times.
 */
import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

const { db } = await import("../src/db/index");
const { mediaItems, versionMedia } = await import("../src/db/schema");
const { sql } = await import("drizzle-orm");
const { SEED_MEDIA } = await import("../src/lib/cms/default-content");

const MEDIA_SEED = [
	{
		id: SEED_MEDIA.mainEntrance,
		filename: "seed-main-entrance.png",
		originalFilename: "seed-main-entrance.png",
		storagePath: "uploads/seed-main-entrance.png",
		mimeType: "image/png",
		sizeBytes: 523363,
		width: 512,
		height: 512,
		altText: "Main Entrance of Widnes Deen Centre",
		caption: "Main Entrance",
	},
	{
		id: SEED_MEDIA.prayerHall,
		filename: "seed-prayer-hall.png",
		originalFilename: "seed-prayer-hall.png",
		storagePath: "uploads/seed-prayer-hall.png",
		mimeType: "image/png",
		sizeBytes: 333915,
		width: 512,
		height: 512,
		altText: "Prayer Hall",
		caption: "Prayer Hall",
	},
	{
		id: SEED_MEDIA.communitySpace,
		filename: "seed-community-space.png",
		originalFilename: "seed-community-space.png",
		storagePath: "uploads/seed-community-space.png",
		mimeType: "image/png",
		sizeBytes: 496283,
		width: 512,
		height: 512,
		altText: "Community Space",
		caption: "Community Space",
	},
	{
		id: SEED_MEDIA.courtyard,
		filename: "seed-courtyard.png",
		originalFilename: "seed-courtyard.png",
		storagePath: "uploads/seed-courtyard.png",
		mimeType: "image/png",
		sizeBytes: 523363,
		width: 512,
		height: 512,
		altText: "Courtyard area",
		caption: "Courtyard",
	},
];

console.log("Seeding media items...");

for (const item of MEDIA_SEED) {
	await db
		.insert(mediaItems)
		.values({ ...item, status: "active" })
		.onConflictDoNothing({ target: mediaItems.id });
}

console.log(`Inserted ${MEDIA_SEED.length} media items (or skipped existing)`);

// Update all page_versions content to reference the seed media IDs
const SLIDES_JSON = JSON.stringify([
	{
		id: "slide-1",
		imageId: SEED_MEDIA.mainEntrance,
		title: "Main Entrance",
		figureLabel: "Fig. 01",
	},
	{
		id: "slide-2",
		imageId: SEED_MEDIA.prayerHall,
		title: "Prayer Hall",
		figureLabel: "Fig. 02",
	},
	{
		id: "slide-3",
		imageId: SEED_MEDIA.communitySpace,
		title: "Community Space",
		figureLabel: "Fig. 03",
	},
	{
		id: "slide-4",
		imageId: SEED_MEDIA.courtyard,
		title: "Courtyard",
		figureLabel: "Fig. 04",
	},
]);

// Get landing page
const page = await db.query.pages.findFirst({
	where: (table, { eq }) => eq(table.slug, "landing"),
});

if (!page) {
	console.log("No landing page found — run the app first to auto-create it.");
	process.exit(0);
}

// Update all versions for this page
const versions = await db.query.pageVersions.findMany({
	where: (table, { eq }) => eq(table.pageId, page.id),
});

for (const version of versions) {
	// Update content JSON
	await db.execute(sql`
    UPDATE page_versions
    SET content = jsonb_set(
      jsonb_set(
        jsonb_set(
          content::jsonb,
          '{hero,backgroundImageId}',
          ${JSON.stringify(SEED_MEDIA.communitySpace)}::jsonb
        ),
        '{about,imageId}',
        ${JSON.stringify(SEED_MEDIA.prayerHall)}::jsonb
      ),
      '{location,slides}',
      ${SLIDES_JSON}::jsonb
    )
    WHERE id = ${version.id}
  `);

	// Link media to version
	for (const item of MEDIA_SEED) {
		await db
			.insert(versionMedia)
			.values({ versionId: version.id, mediaId: item.id })
			.onConflictDoNothing();
	}
}

console.log(
	`Updated ${versions.length} version(s) with media references and links`,
);
console.log("Done!");
process.exit(0);
