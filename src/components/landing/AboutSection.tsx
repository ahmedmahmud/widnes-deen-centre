import type { PageContent } from "@/lib/cms/types";

type AboutSectionProps = {
  content: PageContent["about"] & { imageUrl?: string | null };
};

const fallbackAboutImage = "/uploads/seed-prayer-hall.png";

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="bg-forest overflow-hidden" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[500px] lg:min-h-[600px] bg-clay group">
          <img
            alt="Community gathering"
            className="absolute inset-0 h-full w-full object-cover saturate-warm mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-700"
            src={content.imageUrl ?? fallbackAboutImage}
          />
          <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 bg-sand p-6 sm:p-8 lg:p-12 shadow-[16px_16px_0px_0px_rgba(15,62,48,1)] z-20">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-forest leading-[0.8]">
              {content.titleLineOne}
              <br />
              <span className="text-clay italic">{content.titleLineTwo}</span>
            </h2>
          </div>

        </div>
        <div className="p-8 lg:p-20 xl:p-24 flex flex-col justify-center relative bg-forest text-sand">
          <h3 className="font-mono text-clay text-xs sm:text-sm uppercase tracking-widest mb-10 font-bold bg-sand/10 inline-block px-4 py-2 w-max">
            {content.headingLabel}
          </h3>
          <div className="space-y-6 sm:space-y-8 relative z-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight text-cream">
              {content.missionTitle}
            </p>
            <p className="font-serif text-lg md:text-2xl text-sand/80 leading-relaxed border-l-4 border-clay pl-6 sm:pl-8 py-2">
              {content.missionBody}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
