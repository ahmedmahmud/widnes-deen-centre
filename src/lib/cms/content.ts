import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import {
	jamaatTimes,
	mediaItems,
	pages,
	pageVersions,
	versionMedia,
} from "@/db/schema";
import { defaultPageContent } from "@/lib/cms/default-content";
import type { JamaatTime, PageContent } from "@/lib/cms/types";

export const LANDING_PAGE_SLUG = "landing";

export type PageVersionBundle = {
	pageId: number;
	versionId: string;
	content: PageContent;
	jamaatTimes: JamaatTime[];
	scheduleMediaId: string | null;
	media: Record<string, { id: string; url: string }>;
};

const mapJamaatRow = (row: typeof jamaatTimes.$inferSelect): JamaatTime => ({
	name: row.name,
	kind: row.kind,
	time: row.time ?? undefined,
	offsetMinutes: row.offsetMinutes ?? undefined,
});

/** Ensure a media URL is usable by the frontend.
 *  - Full URLs (https://...) are returned as-is (S3/external storage).
 *  - Relative paths get a leading slash (local storage).
 */
const resolveMediaUrl = (path: string) =>
	path.startsWith("http://") || path.startsWith("https://")
		? path
		: path.startsWith("/")
			? path
			: `/${path}`;

/**
 * Get the landing page row. Throws if it doesn't exist —
 * run `bun run seed` to set up the database first.
 */
async function getLandingPage() {
	const page = await db.query.pages.findFirst({
		where: (table, { eq }) => eq(table.slug, LANDING_PAGE_SLUG),
	});
	if (!page) {
		throw new Error(
			`Landing page not found (slug="${LANDING_PAGE_SLUG}"). Run "bun run seed" first.`,
		);
	}
	return page;
}

async function buildVersionBundle(
	pageId: number,
	version: typeof pageVersions.$inferSelect | undefined,
): Promise<PageVersionBundle> {
	if (!version) {
		return {
			pageId,
			versionId: "",
			content: defaultPageContent,
			jamaatTimes: defaultPageContent.jamaatTimes,
			scheduleMediaId: null,
			media: {},
		};
	}

	const times = await db.query.jamaatTimes.findMany({
		where: (table, { eq }) => eq(table.versionId, version.id),
	});

	const mediaRefs = await db.query.versionMedia.findMany({
		where: (table, { eq }) => eq(table.versionId, version.id),
	});

	const mediaIds = mediaRefs.map((ref) => ref.mediaId);
	const mediaRows = mediaIds.length
		? await db.query.mediaItems.findMany({
				where: (table, { inArray }) => inArray(table.id, mediaIds),
			})
		: [];

	const media = mediaRows.reduce<PageVersionBundle["media"]>((acc, item) => {
		acc[item.id] = {
			id: item.id,
			url: resolveMediaUrl(item.storagePath),
		};
		return acc;
	}, {});

	return {
		pageId,
		versionId: version.id,
		content: version.content as PageContent,
		jamaatTimes: times.map(mapJamaatRow),
		scheduleMediaId: version.scheduleMediaId ?? null,
		media,
	};
}

export async function getLatestPublishedLanding(): Promise<PageVersionBundle> {
	const page = await getLandingPage();

	const version = await db.query.pageVersions.findFirst({
		where: (table, { eq }) => eq(table.id, page.publishedVersionId ?? ""),
	});

	return buildVersionBundle(page.id, version);
}

export async function getLatestDraftLanding(): Promise<PageVersionBundle> {
	const page = await getLandingPage();
	const version = await db.query.pageVersions.findFirst({
		where: (table, { eq }) => eq(table.pageId, page.id),
		orderBy: (table, { desc }) => [desc(table.createdAt)],
	});

	return buildVersionBundle(page.id, version);
}

export async function createPageVersion({
	pageId,
	content,
	jamaatTimes: times,
	mediaIds,
	scheduleMediaId,
	createdByUserId,
}: {
	pageId: number;
	content: PageContent;
	jamaatTimes: JamaatTime[];
	mediaIds: string[];
	scheduleMediaId?: string | null;
	createdByUserId?: string;
}) {
	const [version] = await db
		.insert(pageVersions)
		.values({
			pageId,
			label: "Draft",
			content,
			scheduleMediaId: scheduleMediaId ?? null,
			createdByUserId,
		})
		.returning();

	if (times.length) {
		await db.insert(jamaatTimes).values(
			times.map((time) => ({
				versionId: version.id,
				name: time.name,
				kind: time.kind,
				time: time.time ?? null,
				offsetMinutes: time.offsetMinutes ?? null,
			})),
		);
	}

	if (mediaIds.length) {
		await db.insert(versionMedia).values(
			mediaIds.map((mediaId) => ({
				versionId: version.id,
				mediaId,
			})),
		);
	}

	await db
		.update(pages)
		.set({ publishedVersionId: version.id })
		.where(eq(pages.id, pageId));

	return version;
}

export async function listMedia() {
	const items = await db.query.mediaItems.findMany({
		where: (table, { eq }) => eq(table.status, "active"),
		orderBy: (table, { desc }) => [desc(table.createdAt)],
	});

	return items;
}

export async function canDeleteMedia(mediaId: string) {
	const references = await db.query.versionMedia.findMany({
		where: (table, { eq }) => eq(table.mediaId, mediaId),
	});

	return references.length === 0;
}

export async function archiveMedia(mediaId: string) {
	await db
		.update(mediaItems)
		.set({ status: "archived" })
		.where(eq(mediaItems.id, mediaId));
}

export async function getMediaById(mediaId: string) {
	return db.query.mediaItems.findFirst({
		where: (table, { eq }) => eq(table.id, mediaId),
	});
}
