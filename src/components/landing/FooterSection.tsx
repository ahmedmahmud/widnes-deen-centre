import type { PageContent } from "@/lib/cms/types";
import { RichTextRenderer } from "./RichTextRenderer";

type FooterSectionProps = {
  content: PageContent["footer"];
};

export function FooterSection({ content }: FooterSectionProps) {
  return (
    <footer className="bg-forest-light text-sand pt-16 sm:pt-20 border-t-8 border-clay">
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-sand/10">
        <div className="p-8 sm:p-10 border-b md:border-b-0 border-sand/10 md:border-r">
          <h2 className="text-white mb-6 text-3xl font-serif leading-tight">
            Widnes
            <br />
            <span className="text-clay italic">Deen Centre</span>
          </h2>
          <RichTextRenderer
            value={content.blurb}
            className="max-w-xs opacity-70 mb-8"
            paragraphClassName="font-mono text-xs leading-relaxed"
            blockquoteClassName="font-serif text-sm italic leading-relaxed border-l-4 border-clay pl-4 mt-4"
          />
          <div className="flex gap-4 text-white">
            {content.socialLinks.map((link) => (
              <a
                key={link.label}
                className="bg-sand/10 w-10 h-10 flex items-center justify-center hover:bg-clay transition-colors text-xs font-mono"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="p-8 sm:p-10 border-b md:border-b-0 border-sand/10 md:border-r">
          <h3 className="font-mono text-clay text-xs uppercase tracking-widest mb-8 font-bold">
            Menu
          </h3>
          <ul className="space-y-4 font-serif text-lg sm:text-xl text-sand/90">
            {content.menuLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="hover:text-white hover:translate-x-2 transition-transform inline-block"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 sm:p-10 border-b md:border-b-0 border-sand/10">
          <h3 className="font-mono text-clay text-xs uppercase tracking-widest mb-8 font-bold">
            Contact
          </h3>
          <ul className="space-y-6 font-mono text-sm opacity-80 [font-variant-numeric:tabular-nums]">
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-xl text-clay">
                location_on
              </span>
              <span>
                {content.contactAddressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-xl text-clay">
                phone
              </span>
              {content.contactPhone ? (
                <a href={`tel:${content.contactPhone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {content.contactPhone}
                </a>
              ) : (
                <span></span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase bg-forest-light text-sand/40">
        <p>&copy; 2026 Widnes Deen Centre</p>
      </div>
    </footer>
  );
}
