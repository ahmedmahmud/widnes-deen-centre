import type { PageContent } from "@/lib/cms/types";
import { RichTextRenderer } from "./RichTextRenderer";

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
            <RichTextRenderer
              value={content.title}
              className="text-forest"
              paragraphClassName="text-4xl sm:text-5xl lg:text-7xl font-serif leading-none"
              h1ClassName="text-4xl sm:text-5xl lg:text-7xl font-serif font-black leading-none"
              h2ClassName="text-4xl sm:text-5xl lg:text-7xl font-serif leading-none"
              h3ClassName="text-3xl sm:text-4xl lg:text-5xl font-serif leading-[0.9]"
              blockquoteClassName="text-2xl sm:text-3xl lg:text-5xl font-serif italic text-clay leading-[0.9] pl-4 border-l-4 border-clay mt-4"
            />
          </div>
        </div>
        <div className="p-8 lg:p-20 xl:p-24 flex flex-col justify-center relative bg-forest text-sand">
          <h3 className="font-mono text-clay text-xs sm:text-sm uppercase tracking-widest mb-10 font-bold bg-sand/10 inline-block px-4 py-2 w-max">
            {content.headingLabel}
          </h3>
          <div className="space-y-6 sm:space-y-8 relative z-10">
            <RichTextRenderer
              value={content.missionContent}
              className="text-cream"
              paragraphClassName="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight mb-6"
              h1ClassName="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight"
              h2ClassName="text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-tight"
              h3ClassName="text-xl sm:text-2xl md:text-3xl font-serif font-bold leading-tight text-clay"
              blockquoteClassName="font-serif text-lg md:text-2xl text-sand/80 leading-relaxed border-l-4 border-clay pl-6 sm:pl-8 py-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
