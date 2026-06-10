import type { PageContent, RichTextNode } from "@/lib/cms/types";
import { RichTextRenderer } from "./RichTextRenderer";

type HeroSectionProps = {
	content: PageContent["hero"] & { backgroundUrl?: string | null };
};

const fallbackHeroImage = "/uploads/seed-community-space.png";

export function HeroSection({ content }: HeroSectionProps) {
	const titleLines = content.content.filter((node) => node.type !== "blockquote");
	const subtitleLines = content.content.filter((node) => node.type === "blockquote");

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
					<RichTextRenderer
						value={titleLines}
						className="drop-shadow-lg"
						paragraphClassName="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black font-serif tracking-tight text-cream m-0 leading-[0.95]"
						h1ClassName="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black font-serif tracking-tight text-cream m-0 leading-[0.95]"
					/>

					{subtitleLines.length > 0 ? (
						<div className="mt-8 max-w-xl backdrop-blur-sm bg-forest/10 p-4 border-l-4 border-clay">
							<RichTextRenderer
								value={subtitleLines}
								paragraphClassName="font-mono text-xs sm:text-base md:text-xl text-sand/80 leading-relaxed m-0"
								blockquoteClassName="font-mono text-xs sm:text-base md:text-xl text-sand/80 leading-relaxed m-0 border-none pl-0 italic-none"
							/>
						</div>
					) : null}
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
