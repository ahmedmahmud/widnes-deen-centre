import type { PageContent } from "@/lib/cms/types";

type FooterSectionProps = {
  content: PageContent["footer"];
};

export function FooterSection({ content }: FooterSectionProps) {
  return (
    <footer className="bg-forest-light text-sand pt-16 sm:pt-20 border-t-8 border-clay">
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-sand/10">
        <div className="p-8 sm:p-10 border-b md:border-b-0 border-sand/10 md:border-r">
          <h2 className="text-3xl font-serif text-white mb-6">
            {content.titleLineOne}
            <br />
            <span className="text-clay italic">{content.titleLineTwo}</span>
          </h2>
          <p className="font-mono text-xs leading-relaxed max-w-xs opacity-70 mb-8">
            {content.blurb}
          </p>
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
                <span>{(content as any).contactEmail ?? ""}</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase bg-forest-light text-sand/40">
        <p>© 2025 Widnes Deen Centre</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-white" href="#">
            Privacy
          </a>
          <a className="hover:text-white" href="#">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
