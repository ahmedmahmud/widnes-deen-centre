import type { PageContent } from "@/lib/cms/types";

export const hydrateMedia = <T extends PageContent>(
	content: T,
	media: Record<string, { id: string; url: string }>,
) => {
	const resolveUrl = (id?: string | null) =>
		id && media[id] ? media[id].url : null;

	return {
		...content,
		hero: {
			...content.hero,
			backgroundUrl: resolveUrl(content.hero.backgroundImageId),
		},
		about: {
			...content.about,
			imageUrl: resolveUrl(content.about.imageId),
		},
		location: {
			...content.location,
			slides: content.location.slides.map((slide) => ({
				...slide,
				imageUrl: resolveUrl(slide.imageId),
			})),
		},
	};
};
