import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { contentToFormValues, type PageFormValues } from "@/lib/cms/serialize";
import type { MediaItem } from "@/lib/cms/types";
import {
  ensureAdminSession,
  getAdminData,
  saveLandingFn,
  uploadMediaFn,
  deleteMediaFn,
} from "@/lib/server-fns";

/* ───────────── Route definition ───────────── */

export const Route = createFileRoute("/admin" as never)({
  beforeLoad: async () => {
    try {
      await ensureAdminSession();
    } catch {
      throw redirect({ to: "/login" as never });
    }
  },
  loader: async () => getAdminData(),
  component: AdminRoute,
});

type AdminLoaderData = Awaited<ReturnType<typeof getAdminData>>;

/* ───────────── File -> base64 helper ───────────── */

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:...;base64, prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ───────────── Main admin component ───────────── */

function AdminRoute() {
  const data = Route.useLoaderData() as AdminLoaderData;
  const router = useRouter();
  const initialValues = useMemo(
    () =>
      contentToFormValues(
        data.landing.content,
        data.landing.scheduleMediaId,
      ),
    [data.landing.content, data.landing.scheduleMediaId],
  );

  const [values, setValues] = useState(initialValues);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(
    data.media as MediaItem[],
  );
  const [activeTab, setActiveTab] = useState<"editor" | "media">("editor");
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [pickerTarget, setPickerTarget] = useState<string | null>(null);

  // Dirty state: compare current values to initial (from DB)
  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [values, initialValues],
  );

  // Sync state when loader data changes (e.g. after router.invalidate())
  useEffect(() => {
    setValues(contentToFormValues(data.landing.content, data.landing.scheduleMediaId));
  }, [data.landing.content, data.landing.scheduleMediaId]);

  useEffect(() => {
    setMediaItems(data.media as MediaItem[]);
  }, [data.media]);

  /* ── Field updater ── */
  const updateField = useCallback(
    <T extends keyof PageFormValues>(key: T, value: PageFormValues[T]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  /* ── Resolve media URL from id ── */
  const resolveMediaUrl = useCallback(
    (mediaId: string | null) => {
      if (!mediaId) return null;

      const ensureUrl = (val: string) =>
        val.startsWith("/media/")
          ? val
          : val.startsWith("http://") || val.startsWith("https://")
            ? val
            : `/media/${val.startsWith("/") ? val.slice(1) : val}`;

      // Check version media first
      const fromVersion = data.landing.media[mediaId];
      if (fromVersion) {
        return ensureUrl(fromVersion.url);
      }
      // Then check media items list
      const match = mediaItems.find((item) => item.id === mediaId);
      if (!match) return null;
      return ensureUrl(match.storagePath);
    },
    [data.landing.media, mediaItems],
  );

  /* ── Upload handler ── */
  const handleUpload = useCallback(async (file: File) => {
    const base64 = await fileToBase64(file);
    const uploaded = await uploadMediaFn({
      data: {
        fileBase64: base64,
        fileName: file.name,
        fileType: file.type,
      },
    });
    setMediaItems((prev) => [uploaded as MediaItem, ...prev]);
    return uploaded as MediaItem;
  }, []);

  /* ── Save handler ── */
  const handleSave = async (event?: React.FormEvent) => {
    event?.preventDefault();
    setSaveState("saving");
    try {
      await saveLandingFn({
        data: { pageId: data.landing.pageId, values },
      });
      setSaveState("saved");
      // Reload loader data so state reflects what was saved
      await router.invalidate();
      setTimeout(() => setSaveState("idle"), 2000);
    } catch {
      setSaveState("error");
    }
  };

  /* ── Media picker select ── */
  const handlePickerSelect = useCallback(
    (mediaId: string) => {
      if (!pickerTarget) return;
      if (pickerTarget.startsWith("locationSlides.")) {
        const idx = Number(pickerTarget.split(".")[1]);
        const nextSlides = [...values.locationSlides];
        nextSlides[idx] = { ...nextSlides[idx], imageId: mediaId };
        updateField("locationSlides", nextSlides);
      } else if (pickerTarget === "heroBackgroundImageId") {
        updateField("heroBackgroundImageId", mediaId);
      } else if (pickerTarget === "aboutImageId") {
        updateField("aboutImageId", mediaId);
      } else if (pickerTarget === "scheduleMediaId") {
        updateField("scheduleMediaId", mediaId);
      }
      setPickerTarget(null);
    },
    [pickerTarget, values.locationSlides, updateField],
  );

  return (
    <div className="min-h-screen bg-sand text-plum">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-forest/60">
              Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-forest">
              Edit Page
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a
              href="/"
              className="px-3 py-2 sm:px-4 border border-forest/20 text-xs font-mono uppercase tracking-widest text-forest hover:bg-forest hover:text-sand transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              View Page
            </a>
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-2 sm:px-4 border text-xs font-mono uppercase tracking-widest ${
                activeTab === "editor"
                  ? "bg-forest text-sand"
                  : "border-forest/20 text-forest"
              }`}
            >
              Page Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`px-3 py-2 sm:px-4 border text-xs font-mono uppercase tracking-widest ${
                activeTab === "media"
                  ? "bg-forest text-sand"
                  : "border-forest/20 text-forest"
              }`}
            >
              Media Manager
            </button>
          </div>
        </div>

        {activeTab === "editor" ? (
          <form onSubmit={handleSave} className="space-y-12 pb-24">
            {/* ═══════ Hero Section ═══════ */}
            <SectionCard title="Hero Section" description="The main banner visitors see first">
              <TextInput
                label="Title Line 1"
                value={values.heroTitleLineOne}
                onChange={(v) => updateField("heroTitleLineOne", v)}
              />
              <TextInput
                label="Title Line 2 (italic)"
                value={values.heroTitleLineTwo}
                onChange={(v) => updateField("heroTitleLineTwo", v)}
              />
              <TextInput
                label="Title Line 3"
                value={values.heroTitleLineThree}
                onChange={(v) => updateField("heroTitleLineThree", v)}
              />
              <TextArea
                label="Subtitle"
                value={values.heroSubtitle}
                onChange={(v) => updateField("heroSubtitle", v)}
                hint="Description paragraph below the title"
              />
              <ImagePickerField
                label="Background Image"
                imageId={values.heroBackgroundImageId}
                previewUrl={resolveMediaUrl(values.heroBackgroundImageId)}
                onBrowse={() => setPickerTarget("heroBackgroundImageId")}
                onClear={() => updateField("heroBackgroundImageId", null)}
              />
            </SectionCard>

            {/* ═══════ Jamaat Times ═══════ */}
            <SectionCard title="Jamaat Times" description="Prayer times displayed on the homepage">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TimeInput
                  label="Fajr"
                  value={values.jamaatFajr}
                  onChange={(v) => updateField("jamaatFajr", v)}
                />
                <TimeInput
                  label="Dhuhr"
                  value={values.jamaatDhuhr}
                  onChange={(v) => updateField("jamaatDhuhr", v)}
                />
                <TimeInput
                  label="Asr"
                  value={values.jamaatAsr}
                  onChange={(v) => updateField("jamaatAsr", v)}
                />
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
                    Maghrib Offset (minutes after sunset)
                  </span>
                  <input
                    type="number"
                    value={values.jamaatMaghribOffset}
                    onChange={(e) =>
                      updateField("jamaatMaghribOffset", Number(e.target.value))
                    }
                    className="border border-forest/20 px-4 py-2 bg-white/70"
                  />
                  <span className="text-xs text-forest/40 font-mono">
                    Maghrib is auto-calculated from sunset time
                  </span>
                </div>
                <TimeInput
                  label="Isha"
                  value={values.jamaatIsha}
                  onChange={(v) => updateField("jamaatIsha", v)}
                />
                <TimeInput
                  label="Jummah (Friday Prayer)"
                  value={values.jamaatJummah}
                  onChange={(v) => updateField("jamaatJummah", v)}
                />
              </div>

              <div className="border-t border-forest/10 pt-6 mt-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-forest/60 mb-3">
                  Jamaat Schedule PDF
                </h3>
                <p className="text-xs text-forest/40 font-mono mb-4">
                  Upload a PDF schedule that visitors can download from the homepage
                </p>
                <ImagePickerField
                  label="Schedule File (PDF or Image)"
                  imageId={values.scheduleMediaId}
                  previewUrl={resolveMediaUrl(values.scheduleMediaId)}
                  onBrowse={() => setPickerTarget("scheduleMediaId")}
                  onClear={() => updateField("scheduleMediaId", null)}
                />
              </div>
            </SectionCard>

            {/* ═══════ About Section ═══════ */}
            <SectionCard title="About / Our Story" description="The mission and story section">
              <TextInput
                label="Section Label"
                value={values.aboutHeadingLabel}
                onChange={(v) => updateField("aboutHeadingLabel", v)}
                hint='e.g. "// The Mission"'
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  label="Title Line 1"
                  value={values.aboutTitleLineOne}
                  onChange={(v) => updateField("aboutTitleLineOne", v)}
                />
                <TextInput
                  label="Title Line 2 (italic/accent)"
                  value={values.aboutTitleLineTwo}
                  onChange={(v) => updateField("aboutTitleLineTwo", v)}
                />
              </div>
              <TextInput
                label="Mission Number Label"
                value={values.aboutMissionLabel}
                onChange={(v) => updateField("aboutMissionLabel", v)}
                hint='e.g. "01"'
              />
              <TextArea
                label="Mission Title"
                value={values.aboutMissionTitle}
                onChange={(v) => updateField("aboutMissionTitle", v)}
                hint="Main statement about the centre"
              />
              <TextArea
                label="Mission Body"
                value={values.aboutMissionBody}
                onChange={(v) => updateField("aboutMissionBody", v)}
              />

              <ImagePickerField
                label="About Section Image"
                imageId={values.aboutImageId}
                previewUrl={resolveMediaUrl(values.aboutImageId)}
                onBrowse={() => setPickerTarget("aboutImageId")}
                onClear={() => updateField("aboutImageId", null)}
              />
            </SectionCard>

            {/* ═══════ Location / Find Us ═══════ */}
            <SectionCard title="Location / Find Us" description="Address and image carousel">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  label="Section Label"
                  value={values.locationHeadingLabel}
                  onChange={(v) => updateField("locationHeadingLabel", v)}
                />
                <TextInput
                  label="Title Line 1"
                  value={values.locationTitleLineOne}
                  onChange={(v) => updateField("locationTitleLineOne", v)}
                />
                <TextInput
                  label="Title Line 2 (italic/accent)"
                  value={values.locationTitleLineTwo}
                  onChange={(v) => updateField("locationTitleLineTwo", v)}
                />
                <TextInput
                  label="Address Title"
                  value={values.locationAddressTitle}
                  onChange={(v) => updateField("locationAddressTitle", v)}
                />
              </div>
              <TextArea
                label="Address Lines"
                value={values.locationAddressLines}
                onChange={(v) => updateField("locationAddressLines", v)}
                hint="One line per row"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  label="Parking Label"
                  value={values.locationParkingLabel}
                  onChange={(v) => updateField("locationParkingLabel", v)}
                />
                <TextInput
                  label="Google Maps Link"
                  value={values.locationMapLink}
                  onChange={(v) => updateField("locationMapLink", v)}
                />
              </div>

              {/* Carousel slides */}
              <div className="space-y-4 border-t border-forest/10 pt-6 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-forest/60">
                    Carousel Slides
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...values.locationSlides];
                      next.push({
                        id: `slide-${Date.now()}`,
                        imageId: "",
                        title: "New Slide",
                      });
                      updateField("locationSlides", next);
                    }}
                    className="px-4 py-2 border border-forest/20 font-mono text-xs uppercase tracking-widest hover:bg-forest hover:text-sand transition-colors"
                  >
                    + Add Slide
                  </button>
                </div>
                {values.locationSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="border border-forest/10 p-4 bg-white/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase text-forest/60 font-bold">
                        Slide {idx + 1}
                      </span>
                      <div className="flex gap-2">
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...values.locationSlides];
                              [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                              updateField("locationSlides", next);
                            }}
                            className="text-xs uppercase font-mono text-forest/60 hover:text-forest"
                          >
                            Move Up
                          </button>
                        )}
                        {idx < values.locationSlides.length - 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...values.locationSlides];
                              [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
                              updateField("locationSlides", next);
                            }}
                            className="text-xs uppercase font-mono text-forest/60 hover:text-forest"
                          >
                            Move Down
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            if (values.locationSlides.length <= 1) return;
                            updateField(
                              "locationSlides",
                              values.locationSlides.filter((_, i) => i !== idx),
                            );
                          }}
                          className="text-xs uppercase font-mono text-clay hover:text-clay-dark hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        label="Slide Title"
                        value={slide.title}
                        onChange={(v) => {
                          const next = [...values.locationSlides];
                          next[idx] = { ...slide, title: v };
                          updateField("locationSlides", next);
                        }}
                      />
                    </div>
                    <ImagePickerField
                      label="Slide Image"
                      imageId={slide.imageId || null}
                      previewUrl={resolveMediaUrl(slide.imageId || null)}
                      onBrowse={() => setPickerTarget(`locationSlides.${idx}.imageId`)}
                      onClear={() => {
                        const next = [...values.locationSlides];
                        next[idx] = { ...slide, imageId: "" };
                        updateField("locationSlides", next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* ═══════ Donate ═══════ */}
            <SectionCard title="Donate Section" description="Bank details and donation messaging">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  label="Heading Line 1"
                  value={values.donateHeadingLineOne}
                  onChange={(v) => updateField("donateHeadingLineOne", v)}
                />
                <TextInput
                  label="Heading Line 2 (accent)"
                  value={values.donateHeadingLineTwo}
                  onChange={(v) => updateField("donateHeadingLineTwo", v)}
                />
              </div>
              <TextArea
                label="Donation Body Text"
                value={values.donateBody}
                onChange={(v) => updateField("donateBody", v)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextInput
                  label="Account Name"
                  value={values.donateAccountName}
                  onChange={(v) => updateField("donateAccountName", v)}
                />
                <TextInput
                  label="Sort Code"
                  value={values.donateSortCode}
                  onChange={(v) => updateField("donateSortCode", v)}
                />
                <TextInput
                  label="Account Number"
                  value={values.donateAccountNumber}
                  onChange={(v) => updateField("donateAccountNumber", v)}
                />
              </div>
              <TextArea
                label="Inspirational Quote"
                value={values.donateQuote}
                onChange={(v) => updateField("donateQuote", v)}
                hint="Displayed in the decorative panel"
              />
            </SectionCard>

            {/* ═══════ Footer ═══════ */}
            <SectionCard title="Footer" description="Site footer content and links">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  label="Footer Title Line 1"
                  value={values.footerTitleLineOne}
                  onChange={(v) => updateField("footerTitleLineOne", v)}
                />
                <TextInput
                  label="Footer Title Line 2 (italic)"
                  value={values.footerTitleLineTwo}
                  onChange={(v) => updateField("footerTitleLineTwo", v)}
                />
              </div>
              <TextArea
                label="Footer Blurb"
                value={values.footerBlurb}
                onChange={(v) => updateField("footerBlurb", v)}
              />
              <TextArea
                label="Contact Address"
                value={values.footerContactAddressLines}
                onChange={(v) => updateField("footerContactAddressLines", v)}
                hint="One line per row"
              />
              <TextInput
                label="Contact Phone"
                value={values.footerContactPhone}
                onChange={(v) => updateField("footerContactPhone", v)}
              />

              {/* Menu Links */}
              <div className="border-t border-forest/10 pt-4 mt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
                    Menu Links
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateField("footerMenuLinks", [
                        ...values.footerMenuLinks,
                        { label: "", href: "" },
                      ])
                    }
                    className="text-xs font-mono uppercase text-forest/60 border border-forest/20 px-3 py-1 hover:bg-forest hover:text-sand transition-colors"
                  >
                    + Add
                  </button>
                </div>
                {values.footerMenuLinks.map((link, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-end border border-forest/5 p-3 sm:p-0 sm:border-0">
                    <div className="flex-1 min-w-0">
                      <TextInput
                        label="Label"
                        value={link.label}
                        onChange={(v) => {
                          const next = [...values.footerMenuLinks];
                          next[idx] = { ...link, label: v };
                          updateField("footerMenuLinks", next);
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <TextInput
                        label="Link"
                        value={link.href}
                        onChange={(v) => {
                          const next = [...values.footerMenuLinks];
                          next[idx] = { ...link, href: v };
                          updateField("footerMenuLinks", next);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "footerMenuLinks",
                          values.footerMenuLinks.filter((_, i) => i !== idx),
                        )
                      }
                      className="text-xs font-mono text-clay hover:bg-red-500/10 px-2 py-1 rounded transition-colors self-start sm:self-auto sm:mb-2 flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="border-t border-forest/10 pt-4 mt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
                    Social Links
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateField("footerSocialLinks", [
                        ...values.footerSocialLinks,
                        { label: "", href: "" },
                      ])
                    }
                    className="text-xs font-mono uppercase text-forest/60 border border-forest/20 px-3 py-1 hover:bg-forest hover:text-sand transition-colors"
                  >
                    + Add
                  </button>
                </div>
                {values.footerSocialLinks.map((link, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-end border border-forest/5 p-3 sm:p-0 sm:border-0">
                    <div className="flex-1 min-w-0">
                      <TextInput
                        label="Label"
                        value={link.label}
                        onChange={(v) => {
                          const next = [...values.footerSocialLinks];
                          next[idx] = { ...link, label: v };
                          updateField("footerSocialLinks", next);
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <TextInput
                        label="URL"
                        value={link.href}
                        onChange={(v) => {
                          const next = [...values.footerSocialLinks];
                          next[idx] = { ...link, href: v };
                          updateField("footerSocialLinks", next);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          "footerSocialLinks",
                          values.footerSocialLinks.filter((_, i) => i !== idx),
                        )
                      }
                      className="text-xs font-mono text-clay hover:bg-red-500/10 px-2 py-1 rounded transition-colors self-start sm:self-auto sm:mb-2 flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </form>
        ) : (
          <MediaManager
            items={mediaItems}
            onUpload={handleUpload}
            onDelete={async (mediaId) => {
              await deleteMediaFn({ data: { mediaId } });
              setMediaItems((prev) => prev.filter((item) => item.id !== mediaId));
            }}
          />
        )}
      </div>

      {/* ── Unsaved changes sticky bar ── */}
      {activeTab === "editor" && (isDirty || saveState === "saving" || saveState === "saved" || saveState === "error") && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-forest border-t-2 border-clay shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {saveState === "saved" ? (
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-clay">
                  Saved successfully
                </span>
              ) : saveState === "error" ? (
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-clay">
                  Save failed — try again
                </span>
              ) : (
                <>
                  <span className="w-2 h-2 bg-clay rounded-full flex-shrink-0 animate-pulse" />
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-sand">
                    You have unsaved changes
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving" || !isDirty}
              className="bg-clay text-sand px-5 py-2.5 sm:px-8 sm:py-3 font-mono uppercase tracking-widest text-xs sm:text-sm disabled:opacity-60 hover:bg-clay/80 transition-colors flex-shrink-0"
            >
              {saveState === "saving" ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </div>
      )}

      {/* ── Media picker modal ── */}
      {pickerTarget ? (
        <MediaPickerModal
          items={mediaItems}
          onClose={() => setPickerTarget(null)}
          onSelect={handlePickerSelect}
          onUpload={handleUpload}
        />
      ) : null}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Shared UI Components
   ═══════════════════════════════════════════════════ */

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/70 border border-forest/10 p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-forest">{title}</h2>
        {description && (
          <p className="font-mono text-xs text-forest/40 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-forest/20 px-4 py-2 bg-white/70 focus:outline-none focus:border-forest"
      />
      {hint && (
        <span className="text-xs text-forest/30 font-mono">{hint}</span>
      )}
    </label>
  );
}

function TimeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
        {label}
      </span>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-forest/20 px-4 py-2 bg-white/70 focus:outline-none focus:border-forest"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-forest/20 px-4 py-2 bg-white/70 min-h-[100px] focus:outline-none focus:border-forest"
      />
      {hint && (
        <span className="text-xs text-forest/30 font-mono">{hint}</span>
      )}
    </label>
  );
}

function ImagePickerField({
  label,
  imageId,
  previewUrl,
  onBrowse,
  onClear,
}: {
  label: string;
  imageId: string | null;
  previewUrl: string | null;
  onBrowse: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
        {label}
      </span>
      <button
        type="button"
        onClick={onBrowse}
        className="border border-forest/20 px-3 py-3 sm:px-4 bg-white/70 text-left flex items-center gap-3 sm:gap-4 hover:border-forest transition-colors w-full min-w-0"
      >
        <span className="w-12 h-12 sm:w-14 sm:h-14 border border-forest/10 bg-sand flex items-center justify-center text-xs font-mono text-forest/60 flex-shrink-0 overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            "None"
          )}
        </span>
        <span className="flex-1 min-w-0 overflow-hidden">
          <span className="font-mono text-xs uppercase tracking-widest text-forest/60 block">
            {imageId ? "Selected" : "No file selected"}
          </span>
          <span className="text-sm text-forest truncate block">
            {imageId ? `ID: ${imageId.slice(0, 8)}...` : "Click to browse"}
          </span>
        </span>
        <span className="text-xs uppercase font-mono text-sand bg-forest px-2 py-1 sm:px-3 sm:py-1.5 flex-shrink-0">
          Browse
        </span>
      </button>
      {imageId && (
        <button
          type="button"
          onClick={onClear}
          className="self-start text-xs uppercase font-mono text-clay border border-clay/30 px-3 py-1.5 hover:bg-clay hover:text-sand transition-colors"
        >
          Clear Selection
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Media Manager Tab
   ═══════════════════════════════════════════════════ */

function MediaManager({
  items,
  onUpload,
  onDelete,
}: {
  items: MediaItem[];
  onUpload: (file: File) => Promise<MediaItem>;
  onDelete: (mediaId: string) => Promise<void>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/70 border border-forest/10 p-6 space-y-4">
        <h2 className="font-serif text-2xl text-forest">Upload Media</h2>
        <p className="font-mono text-xs text-forest/40">
          Upload images and documents. Supported: JPG, PNG, GIF, WebP, PDF
        </p>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-5 py-2.5 border border-forest/20 font-mono text-xs uppercase tracking-widest text-forest hover:bg-forest hover:text-sand transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            {uploading ? "Uploading..." : "Choose File"}
          </button>
          {uploading && (
            <span className="font-mono text-xs text-forest/60">
              Processing...
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 border border-forest/10 bg-white/40">
          <p className="font-mono text-sm text-forest/40">
            No media uploaded yet. Upload your first image above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-forest/10 bg-white/70 overflow-hidden"
            >
              {item.mimeType.startsWith("image/") ? (
                <img
                  src={
                    item.storagePath.startsWith("/media/")
                      ? item.storagePath
                      : `/media/${item.storagePath.startsWith("/") ? item.storagePath.slice(1) : item.storagePath}`
                  }
                  alt={item.originalFilename}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-sand-dark/20 flex items-center justify-center">
                  <span className="font-mono text-sm text-forest/60">
                    {item.mimeType}
                  </span>
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="font-mono text-xs text-forest/60 truncate">
                  {item.originalFilename}
                </div>
                {deleteConfirm === item.id ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-xs font-mono text-clay">
                      Are you sure?
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await onDelete(item.id);
                        } catch (err) {
                          alert(
                            err instanceof Error ? err.message : "Delete failed",
                          );
                        }
                        setDeleteConfirm(null);
                      }}
                      className="text-xs uppercase font-mono text-sand bg-clay px-2 py-1 hover:bg-red-600 transition-colors rounded"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(null)}
                      className="text-xs uppercase font-mono text-forest/60"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(item.id)}
                    className="text-xs uppercase font-mono text-clay hover:text-clay-dark hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Media Picker Modal
   ═══════════════════════════════════════════════════ */

function MediaPickerModal({
  items,
  onClose,
  onSelect,
  onUpload,
}: {
  items: MediaItem[];
  onClose: () => void;
  onSelect: (id: string) => void;
  onUpload: (file: File) => Promise<MediaItem>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploaded = await onUpload(file);
      onSelect(uploaded.id);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest/60 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-sand max-w-4xl w-full p-6 space-y-4 border border-forest/20 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-2xl text-forest">
            Select from Media Library
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm uppercase font-mono text-forest hover:text-clay"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-forest/10 pb-4">
          <span className="font-mono text-xs text-forest/60">
            Or upload a new file:
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 border border-forest/20 font-mono text-xs uppercase tracking-widest text-forest hover:bg-forest hover:text-sand transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            {uploading ? "Uploading..." : "Choose File"}
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-mono text-sm text-forest/40">
              No media available. Upload a file above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="border border-forest/10 bg-white/70 text-left hover:border-forest transition-colors group"
              >
                {item.mimeType.startsWith("image/") ? (
                  <img
                    src={
                      item.storagePath.startsWith("/media/")
                        ? item.storagePath
                        : `/media/${item.storagePath.startsWith("/") ? item.storagePath.slice(1) : item.storagePath}`
                    }
                    alt={item.originalFilename}
                    className="w-full h-32 object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-32 bg-sand-dark/20 flex items-center justify-center">
                    <span className="font-mono text-xs text-forest/60">
                      {item.originalFilename.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="p-2">
                  <div className="font-mono text-xs text-forest/60 truncate">
                    {item.originalFilename}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
