import type { PageContent } from "@/lib/cms/types";

export const collectMediaIds = (content: PageContent) => {
	const mediaIds = new Set<string>();

	if (content.hero.backgroundImageId) {
		mediaIds.add(content.hero.backgroundImageId);
	}

	if (content.about.imageId) {
		mediaIds.add(content.about.imageId);
	}

	content.location.slides.forEach((slide) => {
		if (slide.imageId) {
			mediaIds.add(slide.imageId);
		}
	});

	return Array.from(mediaIds);
};
