export type JamaatTimeKind = "fixed" | "sunset";

export type JamaatTime = {
	name: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha" | "jummah";
	kind: JamaatTimeKind;
	time?: string | null;
	offsetMinutes?: number | null;
};

export type RichTextBlockType = "p" | "blockquote" | "h1" | "h2" | "h3";

export type RichTextLeaf = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	color?: string | null;
};

export type RichTextNode = {
	type?: RichTextBlockType;
	children: RichTextLeaf[];
};

export type RichText = RichTextNode[];

export type HeroContent = {
	content: RichText;
	backgroundImageId?: string | null;
};

export type AboutContent = {
	headingLabel: string;
	title: RichText;
	missionContent: RichText;
	imageId?: string | null;
};

export type LocationSlide = {
	id: string;
	imageId: string;
	title: string;
};

export type LocationContent = {
	headingLabel: string;
	title: RichText;
	addressLines: string[];
	parkingLabel: string;
	mapLink: string;
	slides: LocationSlide[];
};

export type DonateContent = {
	heading: RichText;
	body: RichText;
	accountName: string;
	sortCode: string;
	accountNumber: string;
	quote: RichText;
};

export type FooterContent = {
	blurb: RichText;
	menuLinks: { label: string; href: string }[];
	contactAddressLines: string[];
	contactPhone: string;
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
	url: string;
	mimeType: string;
	sizeBytes: number;
	status: "active" | "archived";
	createdAt: string | Date | null;
};
