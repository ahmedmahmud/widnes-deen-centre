/**
 * All server functions for the CMS.
 *
 * IMPORTANT: Every server-only import (db, cms/content, admin-auth, media, etc.)
 * MUST be a dynamic import() inside the .handler() body. Top-level imports of
 * server-only modules leak into the client bundle and crash hydration because
 * they pull in Node built-ins (pg, node:stream, node:fs, etc.).
 *
 * Only import from @tanstack/react-start and pure/shared types at the top level.
 */
import { createServerFn } from "@tanstack/react-start";
import type { PageFormValues } from "@/lib/cms/serialize";

/* ───────────── Auth: getAdminSession ───────────── */

export const getAdminSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const { resolveAdminSession } = await import("@/lib/admin-auth.server");
		return resolveAdminSession();
	},
);

/* ───────────── Auth: ensureAdminSession ───────────── */

export const ensureAdminSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const { ensureAdmin } = await import("@/lib/admin-auth.server");
		return ensureAdmin();
	},
);

/* ───────────── Login ───────────── */

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator((d: unknown) => d as { username: string; password: string })
	.handler(async ({ data }) => {
		const { db } = await import("@/db/index");
		const { logInfo, logWarn } = await import("@/lib/logger");

		const { username, password } = data;
		logInfo("admin-login", "Login attempt", { username });

		if (!username || !password) {
			logWarn("admin-login", "Missing credentials");
			return { ok: false as const, error: "Missing credentials" };
		}

		const match = await db.query.adminUsers.findFirst({
			where: (table, { eq, and }) =>
				and(eq(table.username, username), eq(table.password, password)),
		});

		if (!match) {
			logWarn("admin-login", "Invalid credentials", { username });
			return { ok: false as const, error: "Invalid credentials" };
		}

		logInfo("admin-login", "Login success", { username });

		const { setCookie } = await import("@tanstack/react-start/server");
		setCookie("wdc_admin", encodeURIComponent(username), {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			maxAge: 604800,
		});

		return { ok: true as const };
	});

/* ───────────── Admin Data ───────────── */

export const getAdminData = createServerFn({ method: "GET" }).handler(
	async () => {
		const { ensureAdmin } = await import("@/lib/admin-auth.server");
		const { getLatestDraftLanding, listMedia } = await import(
			"@/lib/cms/content"
		);
		const { logInfo } = await import("@/lib/logger");

		logInfo("admin", "Loading admin data");
		await ensureAdmin();
		const landing = await getLatestDraftLanding();
		const media = await listMedia();

		logInfo("admin", "Admin data loaded", {
			versionId: landing.versionId,
			mediaCount: media.length,
		});
		return { landing, media };
	},
);

/* ───────────── Save Content ───────────── */

export const saveLandingFn = createServerFn({ method: "POST" })
	.inputValidator(
		(d: unknown) => d as { pageId: number; values: PageFormValues },
	)
	.handler(async ({ data }) => {
		const { ensureAdmin } = await import("@/lib/admin-auth.server");
		const { createPageVersion } = await import("@/lib/cms/content");
		const { collectMediaIds } = await import("@/lib/cms/pickers");
		const { formValuesToContent } = await import("@/lib/cms/serialize");
		const { logInfo, logWarn } = await import("@/lib/logger");

		const session = await ensureAdmin();
		const { pageId, values } = data;

		if (!pageId || !values) {
			logWarn("admin-save", "Missing payload");
			throw new Error("Missing payload");
		}

		logInfo("admin-save", "Saving content", { pageId });
		const content = formValuesToContent(values);
		const mediaIds = collectMediaIds(content);

		if (values.scheduleMediaId) {
			mediaIds.push(values.scheduleMediaId);
		}

		const version = await createPageVersion({
			pageId,
			content,
			jamaatTimes: content.jamaatTimes,
			mediaIds: [...new Set(mediaIds)],
			scheduleMediaId: values.scheduleMediaId,
			createdByUserId: session.username,
		});

		logInfo("admin-save", "Save complete", { versionId: version.id });
		return { ok: true, versionId: version.id };
	});

/* ───────────── Media Upload ───────────── */

export const uploadMediaFn = createServerFn({ method: "POST" })
	.inputValidator(
		(d: unknown) =>
			d as { fileBase64: string; fileName: string; fileType: string },
	)
	.handler(async ({ data }) => {
		const { ensureAdmin } = await import("@/lib/admin-auth.server");
		const { logInfo } = await import("@/lib/logger");

		await ensureAdmin();

		// Import local storage adapter to ensure it's configured
		await import("@/lib/media-storage-local");
		const { uploadMedia } = await import("@/lib/cms/media");

		// Reconstruct File from base64
		const binaryStr = atob(data.fileBase64);
		const bytes = new Uint8Array(binaryStr.length);
		for (let i = 0; i < binaryStr.length; i++) {
			bytes[i] = binaryStr.charCodeAt(i);
		}
		const file = new File([bytes], data.fileName, { type: data.fileType });

		const item = await uploadMedia({ file });
		logInfo("media", "Upload complete", {
			mediaId: item.id,
			filename: item.filename,
		});
		return item;
	});

/* ───────────── Media Update ───────────── */

export const updateMediaMetaFn = createServerFn({ method: "POST" })
	.inputValidator(
		(d: unknown) =>
			d as {
				mediaId: string;
				altText?: string | null;
				caption?: string | null;
			},
	)
	.handler(async ({ data }) => {
		const { ensureAdmin } = await import("@/lib/admin-auth.server");
		const { updateMediaMeta } = await import("@/lib/cms/content");

		await ensureAdmin();
		await updateMediaMeta({
			mediaId: data.mediaId,
			caption: data.caption ?? null,
			altText: data.altText ?? null,
		});
		return { ok: true };
	});

/* ───────────── Media Delete ───────────── */

export const deleteMediaFn = createServerFn({ method: "POST" })
	.inputValidator((d: unknown) => d as { mediaId: string })
	.handler(async ({ data }) => {
		const { ensureAdmin } = await import("@/lib/admin-auth.server");
		const { canDeleteMedia, archiveMedia } = await import(
			"@/lib/cms/content"
		);

		await ensureAdmin();
		const allowed = await canDeleteMedia(data.mediaId);
		if (!allowed) {
			throw new Error("Media is in use and cannot be deleted");
		}
		await archiveMedia(data.mediaId);
		return { ok: true };
	});

/* ───────────── Landing Content (for homepage) ───────────── */

const LATITUDE = "53.3614";
const LONGITUDE = "-2.7341";
const LOCAL_TIMEZONE = "Europe/London";

export const getLandingContentFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const { getLatestPublishedLanding, getMediaById } = await import(
			"@/lib/cms/content"
		);
		const { hydrateMedia } = await import("@/lib/cms/media-map");
		const { getSunsetTime, formatSunsetTime } = await import(
			"@/lib/cms/sunset"
		);

		const data = await getLatestPublishedLanding();
		const hydrated = hydrateMedia(data.content, data.media);
		const today = new Date();

		const dateLabel = new Intl.DateTimeFormat("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}).format(today);

		const hijriLabel = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(today);

		const maghrib = data.jamaatTimes.find(
			(time) => time.name === "maghrib",
		);

		let computedTimes = data.jamaatTimes;
		if (maghrib?.kind === "sunset") {
			const date = today.toISOString().slice(0, 10);
			const offsetMinutes = maghrib.offsetMinutes ?? 0;
			const { sunsetUtc } = await getSunsetTime({
				date,
				latitude: LATITUDE,
				longitude: LONGITUDE,
			});

			const maghribTime = formatSunsetTime({
				sunsetUtc,
				offsetMinutes,
				timeZone: LOCAL_TIMEZONE,
			});

			computedTimes = data.jamaatTimes.map((time) =>
				time.name === "maghrib" ? { ...time, time: maghribTime } : time,
			);
		}

		let downloadHref: string | undefined;
		if (data.scheduleMediaId) {
			const scheduleMedia = await getMediaById(data.scheduleMediaId);
			if (scheduleMedia) {
				const path = scheduleMedia.storagePath;
				downloadHref = path.startsWith("/") ? path : `/${path}`;
			}
		}

		return {
			content: hydrated,
			jamaatTimes: computedTimes,
			dateLabel: dateLabel.toUpperCase(),
			hijriLabel: hijriLabel.toUpperCase(),
			downloadHref,
		};
	},
);
