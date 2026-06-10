const hydrateMedia = (content, media) => {
  const resolveUrl = (id) => id && media[id] ? media[id].url : null;
  return {
    ...content,
    hero: {
      ...content.hero,
      backgroundUrl: resolveUrl(content.hero.backgroundImageId)
    },
    about: {
      ...content.about,
      imageUrl: resolveUrl(content.about.imageId)
    },
    location: {
      ...content.location,
      slides: content.location.slides.map((slide) => ({
        ...slide,
        imageUrl: resolveUrl(slide.imageId)
      }))
    }
  };
};
export {
  hydrateMedia
};
