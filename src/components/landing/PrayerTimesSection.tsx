import type { JamaatTime } from "@/lib/cms/types";

type PrayerTimesSectionProps = {
  times: JamaatTime[];
  dateLabel: string;
  hijriLabel: string;
  downloadHref?: string;
};

const timeByName = (times: JamaatTime[], name: JamaatTime["name"]) =>
  times.find((time) => time.name === name);

export function PrayerTimesSection({
  times,
  dateLabel,
  hijriLabel,
  downloadHref,
}: PrayerTimesSectionProps) {
  const fajr = timeByName(times, "fajr");
  const dhuhr = timeByName(times, "dhuhr");
  const asr = timeByName(times, "asr");
  const maghrib = timeByName(times, "maghrib");
  const isha = timeByName(times, "isha");
  const jummah = timeByName(times, "jummah");

  const maghribLabel = maghrib?.time
    ? maghrib.time
    : maghrib?.kind === "sunset" && maghrib.offsetMinutes !== undefined
      ? `Sunset+${maghrib.offsetMinutes}`
      : "";

  return (
    <section className="bg-sand text-forest py-12 sm:py-20 lg:py-24 px-4 lg:px-12 relative" id="prayer-times">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mb-10 lg:mb-20 items-end">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-forest leading-none">
            Jamaat
            <br />
            <span className="text-clay italic">Times</span>
          </h2>
          <div className="lg:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-forest pb-4 gap-4 sm:gap-6">
            <div className="font-mono text-sm text-forest">
              DATE: <span className="font-bold bg-forest text-sand px-1">{dateLabel}</span>
              <br />
              HIJRI: <span className="font-bold text-clay">{hijriLabel}</span>
            </div>
            {downloadHref ? (
              <a
                className="font-mono text-xs uppercase bg-forest text-sand px-4 py-2 hover:bg-clay transition-colors"
                href={downloadHref}
              >
                Download PDF Schedule
              </a>
            ) : null}
          </div>
        </div>
        <div className="border-t-2 border-forest">
          {/* Desktop: 6-column grid */}
          <div className="hidden lg:grid lg:grid-cols-6 border-b-2 border-forest">
            <PrayerTimeCard name="Fajr" label="Iqamah" time={fajr?.time ?? ""} accent />
            <PrayerTimeCard name="Dhuhr" label="Iqamah" time={dhuhr?.time ?? ""} />
            <PrayerTimeCard name="Asr" label="Iqamah" time={asr?.time ?? ""} featured />
            <PrayerTimeCard name="Maghrib" label="Iqamah" time={maghribLabel} />
            <PrayerTimeCard name="Isha" label="Iqamah" time={isha?.time ?? ""} />
            <PrayerTimeCard name="Jummah" label="Khutbah" time={jummah?.time ?? ""} muted />
          </div>
          {/* Mobile/Tablet: compact 2-column or 3-column grid */}
          <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 border-b-2 border-forest">
            <PrayerTimeCardCompact name="Fajr" label="Iqamah" time={fajr?.time ?? ""} accent />
            <PrayerTimeCardCompact name="Dhuhr" label="Iqamah" time={dhuhr?.time ?? ""} />
            <PrayerTimeCardCompact name="Asr" label="Iqamah" time={asr?.time ?? ""} featured />
            <PrayerTimeCardCompact name="Maghrib" label="Iqamah" time={maghribLabel} />
            <PrayerTimeCardCompact name="Isha" label="Iqamah" time={isha?.time ?? ""} />
            <PrayerTimeCardCompact name="Jummah" label="Khutbah" time={jummah?.time ?? ""} muted />
          </div>
        </div>
      </div>
    </section>
  );
}

type PrayerTimeCardProps = {
  name: string;
  label: string;
  time: string;
  featured?: boolean;
  muted?: boolean;
  accent?: boolean;
};

function PrayerTimeCard({
  name,
  label,
  time,
  featured,
  muted,
  accent,
}: PrayerTimeCardProps) {
  if (featured) {
    return (
      <div className="flex flex-col justify-between py-12 px-6 border-r border-forest/30 min-h-[240px] bg-clay relative">
        <div>
          <h3 className="font-serif text-4xl italic font-bold mb-2 text-white">
            {name}
          </h3>
          <span className="text-xs text-white/70 uppercase tracking-widest font-mono font-bold">
            {label}
          </span>
        </div>
        <p className="text-4xl font-bold text-sand mt-8 font-mono">{time}</p>
      </div>
    );
  }

  if (muted) {
    return (
      <div className="flex flex-col justify-between py-12 px-6 min-h-[240px] bg-sand-dark/30 hover:bg-sand-dark/50 transition-colors">
        <div>
          <h3 className="font-serif text-4xl font-bold mb-2">{name}</h3>
          <span className="text-xs opacity-50 uppercase tracking-widest font-mono">
            {label}
          </span>
        </div>
        <p className="text-3xl font-bold text-forest mt-8 font-mono">{time}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between py-12 px-6 border-r border-forest/30 min-h-[240px] hover:bg-white/50 transition-colors">
      <div>
        <h3 className="font-serif text-4xl font-bold mb-2">{name}</h3>
        <span className="text-xs opacity-50 uppercase tracking-widest font-mono">
          {label}
        </span>
      </div>
      <p
        className={`text-3xl font-bold mt-8 font-mono ${
          accent ? "text-clay" : "text-forest"
        }`}
      >
        {time}
      </p>
    </div>
  );
}

/* Compact mobile prayer time card */
function PrayerTimeCardCompact({
  name,
  label,
  time,
  featured,
  muted,
  accent,
}: PrayerTimeCardProps) {
  const bg = featured
    ? "bg-clay"
    : muted
      ? "bg-sand-dark/30"
      : "";
  const textColor = featured
    ? "text-white"
    : "text-forest";
  const timeColor = featured
    ? "text-sand"
    : accent
      ? "text-clay"
      : "text-forest";

  return (
    <div className={`flex items-center justify-between py-4 px-5 border-b border-r border-forest/20 ${bg}`}>
      <div>
        <h3 className={`font-serif text-lg font-bold ${textColor}`}>{name}</h3>
        <span className={`text-[10px] uppercase tracking-widest font-mono ${featured ? "text-white/60" : "opacity-40"}`}>
          {label}
        </span>
      </div>
      <p className={`text-xl font-bold font-mono ${timeColor}`}>{time}</p>
    </div>
  );
}
