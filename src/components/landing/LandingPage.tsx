import { AboutSection } from "@/components/landing/AboutSection";
import { DonateSection } from "@/components/landing/DonateSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { LocationSection } from "@/components/landing/LocationSection";
import { Navigation } from "@/components/landing/Navigation";
import { PrayerTimesSection } from "@/components/landing/PrayerTimesSection";
import type { JamaatTime, PageContent } from "@/lib/cms/types";

type LandingPageProps = {
  content: PageContent & {
    hero: PageContent["hero"] & { backgroundUrl?: string | null };
    about: PageContent["about"] & { imageUrl?: string | null };
    location: PageContent["location"] & {
      slides: (PageContent["location"]["slides"][number] & {
        imageUrl?: string | null;
      })[];
    };
  };
  jamaatTimes: JamaatTime[];
  dateLabel: string;
  hijriLabel: string;
  downloadHref?: string;
};

export function LandingPage({
  content,
  jamaatTimes,
  dateLabel,
  hijriLabel,
  downloadHref,
}: LandingPageProps) {
  return (
    <div className="bg-sand text-plum">
      <Navigation />
      <main>
        <HeroSection content={content.hero} />
        <PrayerTimesSection
          times={jamaatTimes}
          dateLabel={dateLabel}
          hijriLabel={hijriLabel}
          downloadHref={downloadHref}
        />
        <AboutSection content={content.about} />
        <LocationSection content={content.location} />
        <DonateSection content={content.donate} />
      </main>
      <FooterSection content={content.footer} />
    </div>
  );
}
