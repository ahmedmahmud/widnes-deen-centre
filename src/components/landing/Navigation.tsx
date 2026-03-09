import { useState, useEffect } from "react";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "bg-forest/85 backdrop-blur-xl border-sand/10 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex h-16 sm:h-20 items-stretch justify-between max-w-[1800px] mx-auto">
          <a
            href="#hero"
            className="flex items-center gap-3 px-6 sm:px-8 text-sand hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo-wdc.svg"
              alt="Widnes Deen Centre"
              className="h-9 sm:h-10 w-auto text-sand"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-sm sm:text-base font-serif font-bold tracking-wide text-cream hidden sm:inline">
              Widnes Deen Centre
            </span>
          </a>
          <div className="hidden md:flex flex-1 items-center justify-end space-x-12 px-8 lg:px-12">
            <nav className="flex gap-10 text-sm uppercase tracking-widest font-bold text-sand/80">
              <a
                className="hover:text-cream transition-colors"
                href="#hero"
              >
                Home
              </a>
              <a
                className="hover:text-cream transition-colors"
                href="#prayer-times"
              >
                Timings
              </a>
              <a
                className="hover:text-cream transition-colors"
                href="#about"
              >
                About
              </a>
              <a
                className="hover:text-cream transition-colors"
                href="#find-us"
              >
                Location
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <a
              className={`hidden md:flex h-full items-center justify-center px-6 lg:px-8 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                scrolled
                  ? "bg-clay text-cream hover:bg-clay-dark"
                  : "bg-sand/15 backdrop-blur-sm text-cream border-l border-sand/10 hover:bg-sand/25"
              }`}
              href="#donate"
            >
              Donate
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex h-full items-center justify-center px-6 text-cream hover:text-sand transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-forest/90 backdrop-blur-xl border-b border-sand/10 px-6 py-4 flex flex-col gap-1">
          {[
            { label: "Home", href: "#hero" },
            { label: "Timings", href: "#prayer-times" },
            { label: "About", href: "#about" },
            { label: "Location", href: "#find-us" },
            { label: "Donate", href: "#donate" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sand font-mono text-sm uppercase tracking-widest py-3 px-4 hover:bg-sand/10 hover:text-cream transition-colors rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
