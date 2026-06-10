import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as Route } from "./router-Z7fNdJsU.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-CMzxgZBk.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:https";
import "node:http2";
const fallbackAboutImage = "/uploads/seed-prayer-hall.png";
function AboutSection({ content }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-forest overflow-hidden", id: "about", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[500px] lg:min-h-[600px] bg-clay group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          alt: "Community gathering",
          className: "absolute inset-0 h-full w-full object-cover saturate-warm mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-700",
          src: content.imageUrl ?? fallbackAboutImage
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 bg-sand p-6 sm:p-8 lg:p-12 shadow-[16px_16px_0px_0px_rgba(15,62,48,1)] z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl lg:text-7xl font-serif text-forest leading-[0.8]", children: [
        content.titleLineOne,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-clay italic", children: content.titleLineTwo })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 lg:p-20 xl:p-24 flex flex-col justify-center relative bg-forest text-sand", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-clay text-xs sm:text-sm uppercase tracking-widest mb-10 font-bold bg-sand/10 inline-block px-4 py-2 w-max", children: content.headingLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 sm:space-y-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl sm:text-3xl md:text-4xl font-serif leading-tight text-cream", children: content.missionTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg md:text-2xl text-sand/80 leading-relaxed border-l-4 border-clay pl-6 sm:pl-8 py-2", children: content.missionBody }),
        content.missionBodySecondary ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg md:text-2xl text-sand/80 leading-relaxed border-l-4 border-clay pl-6 sm:pl-8 py-2", children: content.missionBodySecondary }) : null
      ] })
    ] })
  ] }) });
}
function DonateSection({ content }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-forest py-20 lg:py-24 px-4 relative overflow-hidden", id: "donate", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-10",
        style: {
          backgroundImage: "radial-gradient(#f3e9d2 2px, transparent 2px)",
          backgroundSize: "30px 30px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto bg-sand p-8 md:p-16 relative block-shadow z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-5 -left-5 bg-clay text-white px-6 py-3 shadow-md transform -rotate-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold uppercase tracking-wider text-sm", children: "Support Us" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-5xl font-serif font-black mb-6 leading-none text-forest", children: [
            content.headingLineOne,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-clay", children: content.headingLineTwo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm leading-relaxed mb-10 text-forest/80", children: content.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-2 border-forest/10 p-6 sm:p-8 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl font-bold text-forest mb-6 border-b border-forest/10 pb-2", children: "Bank Transfer Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 font-mono text-sm text-forest", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60 uppercase text-xs", children: "Account Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-right", children: content.accountName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60 uppercase text-xs", children: "Sort Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-right tracking-wider", children: content.sortCode })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60 uppercase text-xs", children: "Account Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-right tracking-wider text-clay", children: content.accountNumber })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full min-h-[260px] sm:min-h-[300px] relative overflow-hidden bg-forest flex flex-col justify-center items-center text-center p-8 border-4 border-double border-sand/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-7xl sm:text-8xl text-sand/20 mb-4", children: "savings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-xl sm:text-2xl text-sand italic", children: [
            '"',
            content.quote,
            '"'
          ] })
        ] })
      ] })
    ] })
  ] });
}
function FooterSection({ content }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-forest-light text-sand pt-16 sm:pt-20 border-t-8 border-clay", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 border-b border-sand/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 sm:p-10 border-b md:border-b-0 border-sand/10 md:border-r", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-serif text-white mb-6", children: [
          content.titleLineOne,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-clay italic", children: content.titleLineTwo })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs leading-relaxed max-w-xs opacity-70 mb-8", children: content.blurb }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 text-white", children: content.socialLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: "bg-sand/10 w-10 h-10 flex items-center justify-center hover:bg-clay transition-colors text-xs font-mono",
            href: link.href,
            children: link.label
          },
          link.label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 sm:p-10 border-b md:border-b-0 border-sand/10 md:border-r", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-clay text-xs uppercase tracking-widest mb-8 font-bold", children: "Menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4 font-serif text-lg sm:text-xl text-sand/90", children: content.menuLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: "hover:text-white hover:translate-x-2 transition-transform inline-block",
            href: link.href,
            children: link.label
          }
        ) }, link.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 sm:p-10 border-b md:border-b-0 border-sand/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-clay text-xs uppercase tracking-widest mb-8 font-bold", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-6 font-mono text-sm opacity-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-xl text-clay", children: "location_on" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: content.contactAddressLines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              line,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
            ] }, line)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-xl text-clay", children: "mail" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: content.contactEmail })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase bg-forest-light text-sand/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2025 Widnes Deen Centre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-white", href: "#", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-white", href: "#", children: "Terms" })
      ] })
    ] })
  ] });
}
const fallbackHeroImage = "/uploads/seed-community-space.png";
function HeroSection({ content }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "hero",
      suppressHydrationWarning: true,
      className: "relative h-screen w-full flex flex-col bg-forest text-sand overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 w-full h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              alt: "Abstract mosque architecture",
              className: "w-full h-full object-cover natural-filter",
              src: content.backgroundUrl ?? fallbackHeroImage
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-forest/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-forest/20 mix-blend-multiply" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-6 sm:px-8 lg:px-24 flex flex-col justify-center", style: { paddingTop: "5rem", paddingBottom: "4rem", minHeight: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black font-serif leading-[0.95] tracking-tight mb-6 sm:mb-8 text-cream drop-shadow-lg", children: [
            content.titleLineOne,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sand/90 italic", children: content.titleLineTwo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            content.titleLineThree
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm sm:text-base md:text-xl text-sand/80 max-w-xl leading-relaxed backdrop-blur-sm bg-forest/10 p-4 border-l-4 border-clay", children: content.subtitle })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 right-8 hidden lg:block z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 text-sand/60 font-mono text-xs uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scroll for timings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined animate-bounce", children: "arrow_downward" })
        ] }) })
      ]
    }
  );
}
const fallbackSlides = [
  {
    id: "fallback-1",
    imageId: "",
    title: "Main Entrance",
    figureLabel: "Fig. 01",
    imageUrl: "/uploads/seed-main-entrance.png"
  },
  {
    id: "fallback-2",
    imageId: "",
    title: "Prayer Hall",
    figureLabel: "Fig. 02",
    imageUrl: "/uploads/seed-prayer-hall.png"
  },
  {
    id: "fallback-3",
    imageId: "",
    title: "Community Space",
    figureLabel: "Fig. 03",
    imageUrl: "/uploads/seed-community-space.png"
  },
  {
    id: "fallback-4",
    imageId: "",
    title: "Courtyard",
    figureLabel: "Fig. 04",
    imageUrl: "/uploads/seed-courtyard.png"
  }
];
function LocationSection({ content }) {
  const slides = content.slides.length ? content.slides.map((slide, index) => ({
    ...slide,
    imageUrl: slide.imageUrl || fallbackSlides[index % fallbackSlides.length]?.imageUrl
  })) : fallbackSlides;
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const goToPrev = reactExports.useCallback(() => {
    setCurrentIndex((prev) => prev === 0 ? slides.length - 1 : prev - 1);
  }, [slides.length]);
  const goToNext = reactExports.useCallback(() => {
    setCurrentIndex((prev) => prev === slides.length - 1 ? 0 : prev + 1);
  }, [slides.length]);
  const activeSlide = slides[currentIndex];
  const activeImageUrl = activeSlide?.imageUrl || fallbackSlides[0].imageUrl || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand relative py-16 lg:py-32", id: "find-us", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 order-2 lg:order-1 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-12 bg-clay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold uppercase tracking-widest text-forest", children: content.headingLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-forest mb-10 leading-[0.85]", children: [
        content.titleLineOne,
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-clay italic pl-4 sm:pl-8", children: content.titleLineTwo })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 sm:p-10 block-shadow border border-forest/10 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-forest/50 uppercase tracking-widest mb-3", children: "Visit Us At" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-2xl sm:text-3xl lg:text-4xl text-forest leading-tight mb-8", children: [
          content.addressTitle,
          ",",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          content.addressLines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            line,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
          ] }, line))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 bg-sand-dark/20 px-4 py-2 rounded-sm border border-sand-dark/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-6 h-6 bg-clay text-sand font-bold text-xs rounded-sm", children: "P" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold uppercase text-forest tracking-wide", children: content.parkingLabel })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          className: "group inline-flex items-center justify-between w-full bg-clay text-sand px-6 sm:px-8 py-5 sm:py-6 hover:bg-forest transition-colors duration-300 shadow-lg hover:shadow-xl",
          href: content.mapLink,
          target: "_blank",
          rel: "noreferrer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs sm:text-sm font-bold uppercase tracking-widest", children: "Open in Google Maps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined transform group-hover:translate-x-2 transition-transform", children: "arrow_outward" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 order-1 lg:order-2 h-[420px] sm:h-[500px] lg:h-[700px] relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-forest block-shadow overflow-hidden border border-forest/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            alt: activeSlide?.title ?? "",
            className: "absolute inset-0 w-full h-full object-cover saturate-warm transition-opacity duration-700",
            src: activeImageUrl
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60 pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-sand z-30 flex justify-between items-end border-t border-sand/20 backdrop-blur-sm bg-forest/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest mb-2 border-l-2 border-clay pl-3", children: activeSlide?.figureLabel ?? "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl sm:text-3xl", children: activeSlide?.title ?? "" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 sm:gap-6 bg-sand px-4 py-2 text-forest shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-clay", children: String(currentIndex + 1).padStart(2, "0") }),
            " ",
            "/ ",
            slides.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToPrev();
                },
                "aria-label": "Previous slide",
                className: "w-10 h-10 border border-forest/20 flex items-center justify-center hover:bg-forest hover:text-sand transition-colors text-forest cursor-pointer select-none relative z-40",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-sm", children: "arrow_back" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToNext();
                },
                "aria-label": "Next slide",
                className: "w-10 h-10 border border-forest/20 flex items-center justify-center hover:bg-forest hover:text-sand transition-colors text-forest cursor-pointer select-none relative z-40",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-sm", children: "arrow_forward" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-b-2 border-sand/20 z-20 hidden md:block pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-t-2 border-sand/20 z-20 hidden md:block pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 -right-6 w-full h-full border-2 border-clay z-0 hidden lg:block pointer-events-none" })
    ] })
  ] }) }) });
}
function Navigation() {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 w-full z-50 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `transition-all duration-300 ${scrolled ? "bg-forest/85 backdrop-blur-xl shadow-lg" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 sm:h-20 items-stretch justify-between max-w-[1800px] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#hero",
              className: "flex items-center gap-3 px-6 sm:px-8 text-sand hover:opacity-80 transition-opacity",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/logo-wdc.png",
                  alt: "Widnes Deen Centre",
                  className: "h-9 sm:h-10 w-auto text-sand"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex flex-1 items-center justify-end space-x-12 px-8 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex gap-10 text-sm uppercase tracking-widest font-bold text-sand/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: "hover:text-cream transition-colors",
                href: "#hero",
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: "hover:text-cream transition-colors",
                href: "#prayer-times",
                children: "Timings"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: "hover:text-cream transition-colors",
                href: "#about",
                children: "About"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: "hover:text-cream transition-colors",
                href: "#find-us",
                children: "Location"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                className: `hidden md:flex h-full items-center justify-center px-6 lg:px-8 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${scrolled ? "bg-clay text-cream hover:bg-clay-dark" : "bg-sand/15 backdrop-blur-sm text-cream hover:bg-sand/25"}`,
                href: "#donate",
                children: "Donate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMenuOpen((prev) => !prev),
                "aria-label": menuOpen ? "Close menu" : "Open menu",
                className: "md:hidden flex h-full items-center justify-center px-6 text-cream hover:text-sand transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-2xl", children: menuOpen ? "close" : "menu" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "bg-forest/90 backdrop-blur-xl border-b border-sand/10 px-6 py-4 flex flex-col gap-1", children: [
          { label: "Home", href: "#hero" },
          { label: "Timings", href: "#prayer-times" },
          { label: "About", href: "#about" },
          { label: "Location", href: "#find-us" },
          { label: "Donate", href: "#donate" }
        ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: link.href,
            onClick: () => setMenuOpen(false),
            className: "text-sand font-mono text-sm uppercase tracking-widest py-3 px-4 hover:bg-sand/10 hover:text-cream transition-colors rounded-sm",
            children: link.label
          },
          link.label
        )) })
      }
    )
  ] });
}
const timeByName = (times, name) => times.find((time) => time.name === name);
function PrayerTimesSection({
  times,
  dateLabel,
  hijriLabel,
  downloadHref
}) {
  const fajr = timeByName(times, "fajr");
  const dhuhr = timeByName(times, "dhuhr");
  const asr = timeByName(times, "asr");
  const maghrib = timeByName(times, "maghrib");
  const isha = timeByName(times, "isha");
  const jummah = timeByName(times, "jummah");
  const maghribLabel = maghrib?.time ? maghrib.time : maghrib?.kind === "sunset" && maghrib.offsetMinutes !== void 0 ? `Sunset+${maghrib.offsetMinutes}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand text-forest py-12 sm:py-20 lg:py-24 px-4 lg:px-12 relative", id: "prayer-times", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mb-10 lg:mb-20 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-6xl lg:text-8xl font-serif text-forest leading-none", children: [
        "Jamaat",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-clay italic", children: "Times" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-forest pb-4 gap-4 sm:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm text-forest", children: [
          "DATE: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold bg-forest text-sand px-1", children: dateLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "HIJRI: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-clay", children: hijriLabel })
        ] }),
        downloadHref ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: "font-mono text-xs uppercase bg-forest text-sand px-4 py-2 hover:bg-clay transition-colors",
            href: downloadHref,
            children: "Download PDF Schedule"
          }
        ) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t-2 border-forest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:grid lg:grid-cols-6 border-b-2 border-forest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCard, { name: "Fajr", label: "Iqamah", time: fajr?.time ?? "", accent: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCard, { name: "Dhuhr", label: "Iqamah", time: dhuhr?.time ?? "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCard, { name: "Asr", label: "Iqamah", time: asr?.time ?? "", featured: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCard, { name: "Maghrib", label: "Iqamah", time: maghribLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCard, { name: "Isha", label: "Iqamah", time: isha?.time ?? "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCard, { name: "Jummah", label: "Khutbah", time: jummah?.time ?? "", muted: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden grid grid-cols-2 sm:grid-cols-3 border-b-2 border-forest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCardCompact, { name: "Fajr", label: "Iqamah", time: fajr?.time ?? "", accent: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCardCompact, { name: "Dhuhr", label: "Iqamah", time: dhuhr?.time ?? "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCardCompact, { name: "Asr", label: "Iqamah", time: asr?.time ?? "", featured: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCardCompact, { name: "Maghrib", label: "Iqamah", time: maghribLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCardCompact, { name: "Isha", label: "Iqamah", time: isha?.time ?? "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerTimeCardCompact, { name: "Jummah", label: "Khutbah", time: jummah?.time ?? "", muted: true })
      ] })
    ] })
  ] }) });
}
function PrayerTimeCard({
  name,
  label,
  time,
  featured,
  muted,
  accent
}) {
  if (featured) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between py-12 px-6 border-r border-forest/30 min-h-[240px] bg-clay relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-4xl italic font-bold mb-2 text-white", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/70 uppercase tracking-widest font-mono font-bold", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-sand mt-8 font-mono", children: time })
    ] });
  }
  if (muted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between py-12 px-6 min-h-[240px] bg-sand-dark/30 hover:bg-sand-dark/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-4xl font-bold mb-2", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-50 uppercase tracking-widest font-mono", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-forest mt-8 font-mono", children: time })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between py-12 px-6 border-r border-forest/30 min-h-[240px] hover:bg-white/50 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-4xl font-bold mb-2", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-50 uppercase tracking-widest font-mono", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-3xl font-bold mt-8 font-mono ${accent ? "text-clay" : "text-forest"}`,
        children: time
      }
    )
  ] });
}
function PrayerTimeCardCompact({
  name,
  label,
  time,
  featured,
  muted,
  accent
}) {
  const bg = featured ? "bg-clay" : muted ? "bg-sand-dark/30" : "";
  const textColor = featured ? "text-white" : "text-forest";
  const timeColor = featured ? "text-sand" : accent ? "text-clay" : "text-forest";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between py-4 px-5 border-b border-r border-forest/20 ${bg}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `font-serif text-lg font-bold ${textColor}`, children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-mono ${featured ? "text-white/60" : "opacity-40"}`, children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold font-mono ${timeColor}`, children: time })
  ] });
}
function LandingPage({
  content,
  jamaatTimes,
  dateLabel,
  hijriLabel,
  downloadHref
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-sand text-plum", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, { content: content.hero }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PrayerTimesSection,
        {
          times: jamaatTimes,
          dateLabel,
          hijriLabel,
          downloadHref
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, { content: content.about }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LocationSection, { content: content.location }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DonateSection, { content: content.donate })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FooterSection, { content: content.footer })
  ] });
}
function LandingRoute() {
  const data = Route.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LandingPage, { content: data.content, jamaatTimes: data.jamaatTimes, dateLabel: data.dateLabel, hijriLabel: data.hijriLabel, downloadHref: data.downloadHref });
}
export {
  LandingRoute as component
};
