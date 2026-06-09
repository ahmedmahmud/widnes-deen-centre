import type { PageContent, RichText } from "@/lib/cms/types";

export type PageFormValues = {
	heroBackgroundImageId: string | null;
	heroContent: RichText;
	jamaatFajr: string;
	jamaatDhuhr: string;
	jamaatAsr: string;
	jamaatMaghribOffset: number;
	jamaatIsha: string;
	jamaatJummah: string;
	scheduleMediaId: string | null;
	aboutHeadingLabel: string;
	aboutTitle: RichText;
	aboutMissionContent: RichText;
	aboutImageId: string | null;
	locationHeadingLabel: string;
	locationTitle: RichText;
	locationAddressLines: string;
	locationParkingLabel: string;
	locationMapLink: string;
	locationSlides: {
		id: string;
		imageId: string;
		title: string;
	}[];
	donateHeading: RichText;
	donateBody: RichText;
	donateAccountName: string;
	donateSortCode: string;
	donateAccountNumber: string;
	donateQuote: RichText;
	footerBlurb: RichText;
	footerMenuLinks: { label: string; href: string }[];
	footerContactAddressLines: string;
	footerContactPhone: string;
	footerSocialLinks: { label: string; href: string }[];
};

export const contentToFormValues = (
	content: PageContent,
	scheduleMediaId?: string | null,
): PageFormValues => {
	return {
		heroBackgroundImageId: content.hero.backgroundImageId ?? null,
		heroContent: content.hero.content,
		jamaatFajr:
			content.jamaatTimes.find((time) => time.name === "fajr")?.time ?? "",
		jamaatDhuhr:
			content.jamaatTimes.find((time) => time.name === "dhuhr")?.time ?? "",
		jamaatAsr:
			content.jamaatTimes.find((time) => time.name === "asr")?.time ?? "",
		jamaatMaghribOffset:
			content.jamaatTimes.find((time) => time.name === "maghrib")
				?.offsetMinutes ?? 0,
		jamaatIsha:
			content.jamaatTimes.find((time) => time.name === "isha")?.time ?? "",
		jamaatJummah:
			content.jamaatTimes.find((time) => time.name === "jummah")?.time ?? "",
		scheduleMediaId: scheduleMediaId ?? null,
		aboutHeadingLabel: content.about.headingLabel,
		aboutTitle: content.about.title,
		aboutMissionContent: content.about.missionContent,
		aboutImageId: content.about.imageId ?? null,
		locationHeadingLabel: content.location.headingLabel,
		locationTitle: content.location.title,
		locationAddressLines: content.location.addressLines.join("\n"),
		locationParkingLabel: content.location.parkingLabel,
		locationMapLink: content.location.mapLink,
		locationSlides: content.location.slides,
		donateHeading: content.donate.heading,
		donateBody: content.donate.body,
		donateAccountName: content.donate.accountName,
		donateSortCode: content.donate.sortCode,
		donateAccountNumber: content.donate.accountNumber,
		donateQuote: content.donate.quote,
		footerBlurb: content.footer.blurb,
		footerMenuLinks: content.footer.menuLinks,
		footerContactAddressLines: content.footer.contactAddressLines.join("\n"),
		footerContactPhone: content.footer.contactPhone,
		footerSocialLinks: content.footer.socialLinks,
	};
};

export const formValuesToContent = (values: PageFormValues): PageContent => ({
	hero: {
		content: values.heroContent,
		backgroundImageId: values.heroBackgroundImageId,
	},
	jamaatTimes: [
		{ name: "fajr", kind: "fixed", time: values.jamaatFajr },
		{ name: "dhuhr", kind: "fixed", time: values.jamaatDhuhr },
		{ name: "asr", kind: "fixed", time: values.jamaatAsr },
		{
			name: "maghrib",
			kind: "sunset",
			offsetMinutes: values.jamaatMaghribOffset,
		},
		{ name: "isha", kind: "fixed", time: values.jamaatIsha },
		{ name: "jummah", kind: "fixed", time: values.jamaatJummah },
	],
	about: {
		headingLabel: values.aboutHeadingLabel,
		title: values.aboutTitle,
		missionContent: values.aboutMissionContent,
		imageId: values.aboutImageId,
	},
	location: {
		headingLabel: values.locationHeadingLabel,
		title: values.locationTitle,
		addressLines: values.locationAddressLines
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean),
		parkingLabel: values.locationParkingLabel,
		mapLink: values.locationMapLink,
		slides: values.locationSlides,
	},
	donate: {
		heading: values.donateHeading,
		body: values.donateBody,
		accountName: values.donateAccountName,
		sortCode: values.donateSortCode,
		accountNumber: values.donateAccountNumber,
		quote: values.donateQuote,
	},
	footer: {
		blurb: values.footerBlurb,
		menuLinks: values.footerMenuLinks,
		contactAddressLines: values.footerContactAddressLines
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean),
		contactPhone: values.footerContactPhone,
		socialLinks: values.footerSocialLinks,
	},
});
