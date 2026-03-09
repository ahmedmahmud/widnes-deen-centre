import { useState, useCallback } from "react";
import type { PageContent } from "@/lib/cms/types";

type Slide = PageContent["location"]["slides"][number] & {
  imageUrl?: string | null;
};

type LocationSectionProps = {
  content: Omit<PageContent["location"], "slides"> & { slides: Slide[] };
};

const fallbackSlides: Slide[] = [
  {
    id: "fallback-1",
    imageId: "",
    title: "Main Entrance",
    imageUrl: "/uploads/seed-main-entrance.png",
  },
  {
    id: "fallback-2",
    imageId: "",
    title: "Prayer Hall",
    imageUrl: "/uploads/seed-prayer-hall.png",
  },
  {
    id: "fallback-3",
    imageId: "",
    title: "Community Space",
    imageUrl: "/uploads/seed-community-space.png",
  },
  {
    id: "fallback-4",
    imageId: "",
    title: "Courtyard",
    imageUrl: "/uploads/seed-courtyard.png",
  },
];

export function LocationSection({ content }: LocationSectionProps) {
  const slides = content.slides.length
    ? content.slides.map((slide, index) => ({
        ...slide,
        imageUrl:
          slide.imageUrl || fallbackSlides[index % fallbackSlides.length]?.imageUrl,
      }))
    : fallbackSlides;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const activeSlide = slides[currentIndex];
  const activeImageUrl =
    activeSlide?.imageUrl || fallbackSlides[0].imageUrl || "";

  return (
    <section className="bg-sand relative py-16 lg:py-32" id="find-us">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 w-12 bg-clay"></div>
              <span className="font-mono text-sm font-bold uppercase tracking-widest text-forest">
                {content.headingLabel}
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-forest mb-10 leading-[0.85]">
              {content.titleLineOne}
              <br />
              <span className="text-clay italic pl-4 sm:pl-8">
                {content.titleLineTwo}
              </span>
            </h2>
            <div className="bg-white p-8 sm:p-10 block-shadow border border-forest/10 mb-10">
              <p className="font-mono text-xs text-forest/50 uppercase tracking-widest mb-3">
                Visit Us At
              </p>
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest leading-tight mb-8">
                {content.addressTitle},
                <br />
                {content.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <div className="inline-flex items-center gap-3 bg-sand-dark/20 px-4 py-2 rounded-sm border border-sand-dark/30">
                <span className="flex items-center justify-center w-6 h-6 bg-clay text-sand font-bold text-xs rounded-sm">
                  P
                </span>
                <span className="font-mono text-xs font-bold uppercase text-forest tracking-wide">
                  {content.parkingLabel}
                </span>
              </div>
            </div>
            <a
              className="group inline-flex items-center justify-between w-full bg-clay text-sand px-6 sm:px-8 py-5 sm:py-6 hover:bg-forest transition-colors duration-300 shadow-lg hover:shadow-xl"
              href={content.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest">
                Open in Google Maps
              </span>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">
                arrow_outward
              </span>
            </a>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 h-[420px] sm:h-[500px] lg:h-[700px] relative">
            <div className="absolute inset-0 bg-forest block-shadow overflow-hidden border border-forest/10">
              <img
                alt={activeSlide?.title ?? ""}
                className="absolute inset-0 w-full h-full object-cover saturate-warm transition-opacity duration-700"
                src={activeImageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
            {/* Bottom bar with controls */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4 border-t border-sand/20 backdrop-blur-sm bg-forest/40">
              <h3 className="font-serif text-lg sm:text-2xl text-sand truncate mr-3">
                {activeSlide?.title ?? ""}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className="font-mono text-xs sm:text-sm font-bold text-sand whitespace-nowrap">
                  <span className="text-clay">{currentIndex + 1}</span>/{slides.length}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPrev();
                  }}
                  aria-label="Previous slide"
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-sand/30 flex items-center justify-center hover:bg-sand hover:text-forest transition-colors text-sand cursor-pointer select-none relative z-40"
                >
                  <span className="material-symbols-outlined text-sm">
                    arrow_back
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToNext();
                  }}
                  aria-label="Next slide"
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-sand/30 flex items-center justify-center hover:bg-sand hover:text-forest transition-colors text-sand cursor-pointer select-none relative z-40"
                >
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-b-2 border-sand/20 z-20 hidden md:block pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-t-2 border-sand/20 z-20 hidden md:block pointer-events-none"></div>
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-clay z-0 hidden lg:block pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
