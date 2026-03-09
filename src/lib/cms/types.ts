export type JamaatTimeKind = "fixed" | "sunset";

export type JamaatTime = {
	name: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha" | "jummah";
	kind: JamaatTimeKind;
	time?: string | null;
	offsetMinutes?: number | null;
};

export type HeroContent = {
	eyebrow: string;
	titleLineOne: string;
	titleLineTwo: string;
	titleLineThree: string;
	subtitle: string;
	backgroundImageId?: string | null;
};

export type AboutContent = {
	headingLabel: string;
	titleLineOne: string;
	titleLineTwo: string;
	missionLabel: string;
	missionTitle: string;
	missionBody: string;
	missionBodySecondary: string;
	imageId?: string | null;
};

export type LocationSlide = {
	id: string;
	imageId: string;
	title: string;
	figureLabel: string;
};

export type LocationContent = {
	headingLabel: string;
	titleLineOne: string;
	titleLineTwo: string;
	addressTitle: string;
	addressLines: string[];
	parkingLabel: string;
	mapLink: string;
	slides: LocationSlide[];
};

export type DonateContent = {
	headingLineOne: string;
	headingLineTwo: string;
	body: string;
	accountName: string;
	sortCode: string;
	accountNumber: string;
	quote: string;
};

export type FooterContent = {
	titleLineOne: string;
	titleLineTwo: string;
	blurb: string;
	menuLinks: { label: string; href: string }[];
	contactAddressLines: string[];
	contactEmail: string;
	socialLinks: { label: string; href: string }[];
};

export type PageContent = {
	hero: HeroContent;
	jamaatTimes: JamaatTime[];
	about: AboutContent;
	location: LocationContent;
	donate: DonateContent;
	footer: FooterContent;
};

export type MediaItem = {
	id: string;
	filename: string;
	originalFilename: string;
	storagePath: string;
	mimeType: string;
	sizeBytes: number;
	altText: string | null;
	caption: string | null;
	status: "active" | "archived";
	createdAt: string | Date | null;
};
