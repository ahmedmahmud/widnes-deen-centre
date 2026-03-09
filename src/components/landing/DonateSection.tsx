import type { PageContent } from "@/lib/cms/types";

type DonateSectionProps = {
  content: PageContent["donate"];
};

export function DonateSection({ content }: DonateSectionProps) {
  return (
    <section className="bg-forest py-20 lg:py-24 px-4 relative overflow-hidden" id="donate">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#f3e9d2 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      ></div>
      <div className="max-w-5xl mx-auto bg-sand p-6 sm:p-8 md:p-16 relative block-shadow z-10">
        <div className="bg-clay text-white px-4 py-2 sm:px-6 sm:py-3 shadow-md transform -rotate-1 mb-6 sm:mb-0 sm:absolute sm:-top-5 sm:-left-5 w-max">
          <span className="font-mono font-bold uppercase tracking-wider text-xs sm:text-sm">
            Support Us
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-none text-forest">
              {content.headingLineOne}
              <br />
              <span className="text-clay">{content.headingLineTwo}</span>
            </h2>
            <p className="font-mono text-sm leading-relaxed mb-10 text-forest/80">
              {content.body}
            </p>
            <div className="bg-white border-2 border-forest/10 p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-forest mb-6 border-b border-forest/10 pb-2">
                Bank Transfer Details
              </h3>
              <div className="space-y-4 font-mono text-sm text-forest">
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase text-xs">Account Name</span>
                  <span className="font-bold text-right">
                    {content.accountName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase text-xs">Sort Code</span>
                  <span className="font-bold text-right tracking-wider">
                    {content.sortCode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase text-xs">Account Number</span>
                  <span className="font-bold text-right tracking-wider text-clay">
                    {content.accountNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full min-h-[260px] sm:min-h-[300px] relative overflow-hidden bg-forest flex flex-col justify-center items-center text-center p-8 border-4 border-double border-sand/20">
            <span className="material-symbols-outlined text-7xl sm:text-8xl text-sand/20 mb-4">
              savings
            </span>
            <p className="font-serif text-xl sm:text-2xl text-sand italic">
              &quot;{content.quote}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
