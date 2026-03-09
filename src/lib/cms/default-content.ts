import type { PageContent } from "@/lib/cms/types";

/**
 * Well-known seed media IDs.
 * These match the UUIDs inserted by `scripts/seed.ts` into the
 * `media_items` table and uploaded to S3 as placeholder SVGs.
 */
export const SEED_MEDIA = {
	mainEntrance: "a0000001-0000-0000-0000-000000000001",
	prayerHall: "a0000002-0000-0000-0000-000000000002",
	communitySpace: "a0000003-0000-0000-0000-000000000003",
	courtyard: "a0000004-0000-0000-0000-000000000004",
} as const;

export const defaultPageContent: PageContent = {
	hero: {
		titleLineOne: "Worship, Charity &",
		titleLineTwo: "Community Welfare",
		titleLineThree: "in Widnes",
		subtitle:
			"A spiritual sanctuary and community hub serving the heart of Halton.",
		backgroundImageId: SEED_MEDIA.communitySpace,
	},
	jamaatTimes: [
		{ name: "fajr", kind: "fixed", time: "06:00" },
		{ name: "dhuhr", kind: "fixed", time: "13:30" },
		{ name: "asr", kind: "fixed", time: "16:45" },
		{ name: "maghrib", kind: "sunset", offsetMinutes: 5 },
		{ name: "isha", kind: "fixed", time: "20:45" },
		{ name: "jummah", kind: "fixed", time: "13:00" },
	],
	about: {
		headingLabel: "// The Mission",
		titleLineOne: "OUR",
		titleLineTwo: "STORY",
		missionLabel: "01",
		missionTitle:
			"Widnes Deen Center is the body that helps the Widnes Islamic Centre to function.",
		missionBody:
			"The Associations role is to provide all manner of Islamic functions, events and general day-to-day running of the centre.",
		missionBodySecondary: "",
		imageId: SEED_MEDIA.prayerHall,
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
		],
	},
	donate: {
		headingLineOne: "GENEROSITY",
		headingLineTwo: "MATTERS",
		body: "Your contributions help us maintain the centre and serve the community effectively.",
		accountName: "Widnes Deen Center",
		sortCode: "16-24-06",
		accountNumber: "20374041",
		quote: "Those who spend their wealth in charity...",
	},
	footer: {
		titleLineOne: "Widnes",
		titleLineTwo: "Deen Centre",
		blurb: "Serving the community of Widnes with faith and dedication.",
		menuLinks: [
			{ label: "Timings", href: "#prayer-times" },
			{ label: "Events", href: "#" },
			{ label: "About", href: "#about" },
			{ label: "Contact", href: "#find-us" },
		],
		contactAddressLines: ["Widnes Deen Centre", "Widnes, UK"],
		contactEmail: "info@widnesdeencentre.org",
		socialLinks: [
			{ label: "FB", href: "#" },
			{ label: "TW", href: "#" },
			{ label: "IG", href: "#" },
		],
	},
};
