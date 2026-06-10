import { d as db, p as pageVersions, j as jamaatTimes, v as versionMedia, a as pages, m as mediaItems } from "./index-Dinle6nz.mjs";
import { e as eq } from "../_libs/drizzle-orm.mjs";
import "../_libs/pg.mjs";
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
const SEED_MEDIA = {
  mainEntrance: "a0000001-0000-0000-0000-000000000001",
  prayerHall: "a0000002-0000-0000-0000-000000000002",
  communitySpace: "a0000003-0000-0000-0000-000000000003",
  courtyard: "a0000004-0000-0000-0000-000000000004"
};
const defaultPageContent = {
  hero: {
    titleLineOne: "Worship, Charity &",
    titleLineTwo: "Community Welfare",
    titleLineThree: "in Widnes",
    subtitle: "A spiritual sanctuary and community hub serving the heart of Halton.",
    backgroundImageId: SEED_MEDIA.communitySpace
  },
  jamaatTimes: [
    { name: "fajr", kind: "fixed", time: "06:00" },
    { name: "dhuhr", kind: "fixed", time: "13:30" },
    { name: "asr", kind: "fixed", time: "16:45" },
    { name: "maghrib", kind: "sunset", offsetMinutes: 5 },
    { name: "isha", kind: "fixed", time: "20:45" },
    { name: "jummah", kind: "fixed", time: "13:00" }
  ],
  about: {
    headingLabel: "// The Mission",
    titleLineOne: "OUR",
    titleLineTwo: "STORY",
    missionLabel: "01",
    missionTitle: "Widnes Deen Center is the body that helps the Widnes Islamic Centre to function.",
    missionBody: "The Associations role is to provide all manner of Islamic functions, events and general day-to-day running of the centre.",
    missionBodySecondary: "",
    imageId: SEED_MEDIA.prayerHall
  },
  location: {
    headingLabel: "Location",
    titleLineOne: "FIND",
    titleLineTwo: "US",
    addressTitle: "Widnes Deen Centre",
    addressLines: ["Widnes, UK"],
    parkingLabel: "On-Site Parking Available",
    mapLink: "https://maps.google.com",
    slides: [
      {
        id: "slide-1",
        imageId: SEED_MEDIA.mainEntrance,
        title: "Main Entrance",
        figureLabel: "Fig. 01"
      },
      {
        id: "slide-2",
        imageId: SEED_MEDIA.prayerHall,
        title: "Prayer Hall",
        figureLabel: "Fig. 02"
      },
      {
        id: "slide-3",
        imageId: SEED_MEDIA.communitySpace,
        title: "Community Space",
        figureLabel: "Fig. 03"
      },
      {
        id: "slide-4",
        imageId: SEED_MEDIA.courtyard,
        title: "Courtyard",
        figureLabel: "Fig. 04"
      }
    ]
  },
  donate: {
    headingLineOne: "GENEROSITY",
    headingLineTwo: "MATTERS",
    body: "Your contributions help us maintain the centre and serve the community effectively.",
    accountName: "Widnes Deen Center",
    sortCode: "16-24-06",
    accountNumber: "20374041",
    quote: "Those who spend their wealth in charity..."
  },
  footer: {
    titleLineOne: "Widnes",
    titleLineTwo: "Deen Centre",
    blurb: "Serving the community of Widnes with faith and dedication.",
    menuLinks: [
      { label: "Timings", href: "#prayer-times" },
      { label: "Events", href: "#" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#find-us" }
    ],
    contactAddressLines: ["Widnes Deen Centre", "Widnes, UK"],
    contactEmail: "info@widnesdeencentre.org",
    socialLinks: [
      { label: "FB", href: "#" },
      { label: "TW", href: "#" },
      { label: "IG", href: "#" }
    ]
  }
};
const LANDING_PAGE_SLUG = "landing";
const mapJamaatRow = (row) => ({
  name: row.name,
  kind: row.kind,
  time: row.time ?? void 0,
  offsetMinutes: row.offsetMinutes ?? void 0
});
const resolveMediaUrl = (path) => path.startsWith("http://") || path.startsWith("https://") ? path : path.startsWith("/") ? path : `/${path}`;
async function getLandingPage() {
  const page = await db.query.pages.findFirst({
    where: (table, { eq: eq2 }) => eq2(table.slug, LANDING_PAGE_SLUG)
  });
  if (!page) {
    throw new Error(
      `Landing page not found (slug="${LANDING_PAGE_SLUG}"). Run "bun run seed" first.`
    );
  }
  return page;
}
async function buildVersionBundle(pageId, version) {
  if (!version) {
    return {
      pageId,
      versionId: "",
      content: defaultPageContent,
      jamaatTimes: defaultPageContent.jamaatTimes,
      scheduleMediaId: null,
      media: {}
    };
  }
  const times = await db.query.jamaatTimes.findMany({
    where: (table, { eq: eq2 }) => eq2(table.versionId, version.id)
  });
  const mediaRefs = await db.query.versionMedia.findMany({
    where: (table, { eq: eq2 }) => eq2(table.versionId, version.id)
  });
  const mediaIds = mediaRefs.map((ref) => ref.mediaId);
  const mediaRows = mediaIds.length ? await db.query.mediaItems.findMany({
    where: (table, { inArray }) => inArray(table.id, mediaIds)
  }) : [];
  const media = mediaRows.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      url: resolveMediaUrl(item.storagePath)
    };
    return acc;
  }, {});
  return {
    pageId,
    versionId: version.id,
    content: version.content,
    jamaatTimes: times.map(mapJamaatRow),
    scheduleMediaId: version.scheduleMediaId ?? null,
    media
  };
}
async function getLatestPublishedLanding() {
  const page = await getLandingPage();
  const version = await db.query.pageVersions.findFirst({
    where: (table, { eq: eq2 }) => eq2(table.id, page.publishedVersionId ?? "")
  });
  return buildVersionBundle(page.id, version);
}
async function getLatestDraftLanding() {
  const page = await getLandingPage();
  const version = await db.query.pageVersions.findFirst({
    where: (table, { eq: eq2 }) => eq2(table.pageId, page.id),
    orderBy: (table, { desc }) => [desc(table.createdAt)]
  });
  return buildVersionBundle(page.id, version);
}
async function createPageVersion({
  pageId,
  content,
  jamaatTimes: times,
  mediaIds,
  scheduleMediaId,
  createdByUserId
}) {
  const [version] = await db.insert(pageVersions).values({
    pageId,
    label: "Draft",
    content,
    scheduleMediaId: scheduleMediaId ?? null,
    createdByUserId
  }).returning();
  if (times.length) {
    await db.insert(jamaatTimes).values(
      times.map((time) => ({
        versionId: version.id,
        name: time.name,
        kind: time.kind,
        time: time.time ?? null,
        offsetMinutes: time.offsetMinutes ?? null
      }))
    );
  }
  if (mediaIds.length) {
    await db.insert(versionMedia).values(
      mediaIds.map((mediaId) => ({
        versionId: version.id,
        mediaId
      }))
    );
  }
  await db.update(pages).set({ publishedVersionId: version.id }).where(eq(pages.id, pageId));
  return version;
}
async function listMedia() {
  const items = await db.query.mediaItems.findMany({
    where: (table, { eq: eq2 }) => eq2(table.status, "active"),
    orderBy: (table, { desc }) => [desc(table.createdAt)]
  });
  return items;
}
async function canDeleteMedia(mediaId) {
  const references = await db.query.versionMedia.findMany({
    where: (table, { eq: eq2 }) => eq2(table.mediaId, mediaId)
  });
  return references.length === 0;
}
async function archiveMedia(mediaId) {
  await db.update(mediaItems).set({ status: "archived" }).where(eq(mediaItems.id, mediaId));
}
async function getMediaById(mediaId) {
  return db.query.mediaItems.findFirst({
    where: (table, { eq: eq2 }) => eq2(table.id, mediaId)
  });
}
export {
  LANDING_PAGE_SLUG,
  archiveMedia,
  canDeleteMedia,
  createPageVersion,
  getLatestDraftLanding,
  getLatestPublishedLanding,
  getMediaById,
  listMedia
};
