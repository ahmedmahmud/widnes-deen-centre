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
		content: [
			{ type: "p", children: [{ text: "Worship, Charity &" }] },
			{
				type: "p",
				children: [{ text: "Community Welfare", italic: true }],
			},
			{ type: "p", children: [{ text: "in Widnes" }] },
			{
				type: "blockquote",
				children: [
					{
						text: "A spiritual sanctuary and community hub serving the heart of Halton.",
					},
				],
			},
		],
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
		title: [
			{
				type: "p",
				children: [
					{ text: "ABOUT " },
					{ text: "US", color: "#c25e40", italic: true },
				],
			},
		],
		missionContent: [
			{
				type: "p",
				children: [
					{
						text: "Widnes Deen Center is the body that helps the Widnes Islamic Centre to function.",
					},
				],
			},
			{
				type: "p",
				children: [{ text: "" }],
			},
			{
				type: "blockquote",
				children: [
					{
						text: "The Associations role is to provide all manner of Islamic functions, events and general day-to-day running of the centre.",
					},
				],
			},
		],
		imageId: SEED_MEDIA.prayerHall,
		},
		location: {
			headingLabel: "Location",
			title: [
				{
					type: "p",
					children: [
						{ text: "FIND " },
						{ text: "US", italic: true, color: "#c25e40" },
					],
				},
			],
		addressLines: [
			"Widnes Deen Centre",
			"31-35 Alforde Street",
			"Widnes",
			"WA8 7TQ",
		],
		parkingLabel: "On-Site Parking Available",
		mapLink: "https://maps.google.com/?q=31-35+Alforde+Street+Widnes+WA8+7TQ",
		slides: [
			{
				id: "slide-1",
				imageId: SEED_MEDIA.mainEntrance,
				title: "Main Entrance",
			},
			{
				id: "slide-2",
				imageId: SEED_MEDIA.prayerHall,
				title: "Prayer Hall",
			},
			{
				id: "slide-3",
				imageId: SEED_MEDIA.communitySpace,
				title: "Community Space",
			},
			{
				id: "slide-4",
				imageId: SEED_MEDIA.courtyard,
				title: "Courtyard",
			},
		],
	},
		donate: {
		heading: [
			{ type: "p", children: [{ text: "GENEROSITY" }] },
			{
				type: "p",
				children: [{ text: "MATTERS", color: "#c25e40" }],
			},
		],
		body: [
			{
				type: "p",
				children: [
					{
						text: "Your contributions help us maintain the centre and serve the community effectively.",
					},
				],
			},
		],
		accountName: "Widnes Deen Center",
		sortCode: "16-24-06",
		accountNumber: "20374041",
		quote: [
			{
				type: "p",
				children: [
					{
						text: '"Those who spend their wealth in charity day and night, secretly and openly — their reward is with their Lord."',
						italic: true,
					},
				],
			},
			{
				type: "p",
				children: [
					{
						text: "Surah Al-Baqarah 2:274",
					},
				],
			},
		],
	},
	footer: {
		blurb: [
			{
				type: "p",
				children: [
					{
						text: "Serving the community of Widnes with faith and dedication.",
					},
				],
			},
		],
		menuLinks: [
			{ label: "Timings", href: "#prayer-times" },
			{ label: "About", href: "#about" },
			{ label: "Contact", href: "#find-us" },
		],
		contactAddressLines: [
			"Widnes Deen Centre",
			"31-35 Alforde Street",
			"Widnes, WA8 7TQ",
		],
		contactPhone: "07401 417272",
		socialLinks: [
			{ label: "FB", href: "#" },
			{ label: "TW", href: "#" },
			{ label: "IG", href: "#" },
		],
	},
};
