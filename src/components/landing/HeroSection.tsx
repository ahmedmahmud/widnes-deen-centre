import type { PageContent } from "@/lib/cms/types";

type HeroSectionProps = {
	content: PageContent["hero"] & { backgroundUrl?: string | null };
};

const fallbackHeroImage = "/uploads/seed-community-space.png";

export function HeroSection({ content }: HeroSectionProps) {
	return (
		<section
			id="hero"
			suppressHydrationWarning
			className="relative h-screen w-full flex flex-col bg-forest text-sand overflow-hidden"
		>
			<div className="absolute inset-0 w-full h-full">
				<img
					alt="Abstract mosque architecture"
					className="w-full h-full object-cover natural-filter"
					src={content.backgroundUrl ?? fallbackHeroImage}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/40 to-transparent"></div>
				<div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-forest/30"></div>
				<div className="absolute inset-0 bg-forest/20 mix-blend-multiply"></div>
			</div>
		<div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-24 flex flex-col justify-center" style={{ paddingTop: "5rem", paddingBottom: "4rem", minHeight: "100%" }}>
			<div className="max-w-4xl">
				<h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black font-serif leading-[0.95] tracking-tight mb-6 sm:mb-8 text-cream drop-shadow-lg">
						{content.titleLineOne}
						<br />
						<span className="text-sand/90 italic">{content.titleLineTwo}</span>
						<br />
						{content.titleLineThree}
					</h1>
					<p className="font-mono text-sm sm:text-base md:text-xl text-sand/80 max-w-xl leading-relaxed backdrop-blur-sm bg-forest/10 p-4 border-l-4 border-clay">
						{content.subtitle}
					</p>
				</div>
			</div>
			<div className="absolute bottom-8 right-8 hidden lg:block z-10">
				<div className="flex flex-col items-end gap-2 text-sand/60 font-mono text-xs uppercase tracking-widest">
					<span>Scroll for timings</span>
					<span className="material-symbols-outlined animate-bounce">
						arrow_downward
					</span>
				</div>
			</div>
		</section>
	);
}
