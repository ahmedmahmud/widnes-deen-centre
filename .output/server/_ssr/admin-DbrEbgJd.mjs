import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouter } from "../_libs/tanstack__react-router.mjs";
import { contentToFormValues } from "./serialize-BfRcAvkx.mjs";
import { R as Route$1, u as uploadMediaFn, d as deleteMediaFn, s as saveLandingFn } from "./router-Z7fNdJsU.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function AdminRoute() {
  const data = Route$1.useLoaderData();
  const router = useRouter();
  const initialValues = reactExports.useMemo(() => contentToFormValues(data.landing.content, data.landing.scheduleMediaId), [data.landing.content, data.landing.scheduleMediaId]);
  const [values, setValues] = reactExports.useState(initialValues);
  const [mediaItems, setMediaItems] = reactExports.useState(data.media);
  const [activeTab, setActiveTab] = reactExports.useState("editor");
  const [saveState, setSaveState] = reactExports.useState("idle");
  const [pickerTarget, setPickerTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setValues(contentToFormValues(data.landing.content, data.landing.scheduleMediaId));
  }, [data.landing.content, data.landing.scheduleMediaId]);
  reactExports.useEffect(() => {
    setMediaItems(data.media);
  }, [data.media]);
  const updateField = reactExports.useCallback((key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);
  const resolveMediaUrl = reactExports.useCallback((mediaId) => {
    if (!mediaId) return null;
    const ensureUrl = (val) => val.startsWith("http://") || val.startsWith("https://") ? val : val.startsWith("/") ? val : `/${val}`;
    const fromVersion = data.landing.media[mediaId];
    if (fromVersion) {
      return ensureUrl(fromVersion.url);
    }
    const match = mediaItems.find((item) => item.id === mediaId);
    if (!match) return null;
    return ensureUrl(match.storagePath);
  }, [data.landing.media, mediaItems]);
  const handleUpload = reactExports.useCallback(async (file) => {
    const base64 = await fileToBase64(file);
    const uploaded = await uploadMediaFn({
      data: {
        fileBase64: base64,
        fileName: file.name,
        fileType: file.type
      }
    });
    setMediaItems((prev) => [uploaded, ...prev]);
    return uploaded;
  }, []);
  const handleSave = async (event) => {
    event.preventDefault();
    setSaveState("saving");
    try {
      await saveLandingFn({
        data: {
          pageId: data.landing.pageId,
          values
        }
      });
      setSaveState("saved");
      await router.invalidate();
      setTimeout(() => setSaveState("idle"), 2e3);
    } catch {
      setSaveState("error");
    }
  };
  const handlePickerSelect = reactExports.useCallback((mediaId) => {
    if (!pickerTarget) return;
    if (pickerTarget.startsWith("locationSlides.")) {
      const idx = Number(pickerTarget.split(".")[1]);
      const nextSlides = [...values.locationSlides];
      nextSlides[idx] = {
        ...nextSlides[idx],
        imageId: mediaId
      };
      updateField("locationSlides", nextSlides);
    } else if (pickerTarget === "heroBackgroundImageId") {
      updateField("heroBackgroundImageId", mediaId);
    } else if (pickerTarget === "aboutImageId") {
      updateField("aboutImageId", mediaId);
    } else if (pickerTarget === "scheduleMediaId") {
      updateField("scheduleMediaId", mediaId);
    }
    setPickerTarget(null);
  }, [pickerTarget, values.locationSlides, updateField]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-sand text-plum", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-serif text-forest", children: "Edit Page" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "px-4 py-2 border border-forest/20 text-xs font-mono uppercase tracking-widest text-forest hover:bg-forest hover:text-sand transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-base", children: "arrow_back" }),
            "View Page"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveTab("editor"), className: `px-4 py-2 border text-xs font-mono uppercase tracking-widest ${activeTab === "editor" ? "bg-forest text-sand" : "border-forest/20 text-forest"}`, children: "Page Editor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveTab("media"), className: `px-4 py-2 border text-xs font-mono uppercase tracking-widest ${activeTab === "media" ? "bg-forest text-sand" : "border-forest/20 text-forest"}`, children: "Media Manager" })
        ] })
      ] }),
      activeTab === "editor" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Hero Section", description: "The main banner visitors see first", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 1", value: values.heroTitleLineOne, onChange: (v) => updateField("heroTitleLineOne", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 2 (italic)", value: values.heroTitleLineTwo, onChange: (v) => updateField("heroTitleLineTwo", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 3", value: values.heroTitleLineThree, onChange: (v) => updateField("heroTitleLineThree", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Subtitle", value: values.heroSubtitle, onChange: (v) => updateField("heroSubtitle", v), hint: "Description paragraph below the title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePickerField, { label: "Background Image", imageId: values.heroBackgroundImageId, previewUrl: resolveMediaUrl(values.heroBackgroundImageId), onBrowse: () => setPickerTarget("heroBackgroundImageId"), onClear: () => updateField("heroBackgroundImageId", null) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Jamaat Times", description: "Prayer times displayed on the homepage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimeInput, { label: "Fajr", value: values.jamaatFajr, onChange: (v) => updateField("jamaatFajr", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimeInput, { label: "Dhuhr", value: values.jamaatDhuhr, onChange: (v) => updateField("jamaatDhuhr", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimeInput, { label: "Asr", value: values.jamaatAsr, onChange: (v) => updateField("jamaatAsr", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: "Maghrib Offset (minutes after sunset)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: values.jamaatMaghribOffset, onChange: (e) => updateField("jamaatMaghribOffset", Number(e.target.value)), className: "border border-forest/20 px-4 py-2 bg-white/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-forest/40 font-mono", children: "Maghrib is auto-calculated from sunset time" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimeInput, { label: "Isha", value: values.jamaatIsha, onChange: (v) => updateField("jamaatIsha", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimeInput, { label: "Jummah (Friday Prayer)", value: values.jamaatJummah, onChange: (v) => updateField("jamaatJummah", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-forest/10 pt-6 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-xs uppercase tracking-widest text-forest/60 mb-3", children: "Jamaat Schedule PDF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/40 font-mono mb-4", children: "Upload a PDF schedule that visitors can download from the homepage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePickerField, { label: "Schedule File (PDF or Image)", imageId: values.scheduleMediaId, previewUrl: resolveMediaUrl(values.scheduleMediaId), onBrowse: () => setPickerTarget("scheduleMediaId"), onClear: () => updateField("scheduleMediaId", null) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "About / Our Story", description: "The mission and story section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Section Label", value: values.aboutHeadingLabel, onChange: (v) => updateField("aboutHeadingLabel", v), hint: 'e.g. "// The Mission"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 1", value: values.aboutTitleLineOne, onChange: (v) => updateField("aboutTitleLineOne", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 2 (italic/accent)", value: values.aboutTitleLineTwo, onChange: (v) => updateField("aboutTitleLineTwo", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Mission Number Label", value: values.aboutMissionLabel, onChange: (v) => updateField("aboutMissionLabel", v), hint: 'e.g. "01"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Mission Title", value: values.aboutMissionTitle, onChange: (v) => updateField("aboutMissionTitle", v), hint: "Main statement about the centre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Mission Body", value: values.aboutMissionBody, onChange: (v) => updateField("aboutMissionBody", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Mission Body (Secondary)", value: values.aboutMissionBodySecondary, onChange: (v) => updateField("aboutMissionBodySecondary", v), hint: "Optional second paragraph" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePickerField, { label: "About Section Image", imageId: values.aboutImageId, previewUrl: resolveMediaUrl(values.aboutImageId), onBrowse: () => setPickerTarget("aboutImageId"), onClear: () => updateField("aboutImageId", null) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Location / Find Us", description: "Address and image carousel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Section Label", value: values.locationHeadingLabel, onChange: (v) => updateField("locationHeadingLabel", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 1", value: values.locationTitleLineOne, onChange: (v) => updateField("locationTitleLineOne", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Title Line 2 (italic/accent)", value: values.locationTitleLineTwo, onChange: (v) => updateField("locationTitleLineTwo", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Address Title", value: values.locationAddressTitle, onChange: (v) => updateField("locationAddressTitle", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Address Lines", value: values.locationAddressLines, onChange: (v) => updateField("locationAddressLines", v), hint: "One line per row" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Parking Label", value: values.locationParkingLabel, onChange: (v) => updateField("locationParkingLabel", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Google Maps Link", value: values.locationMapLink, onChange: (v) => updateField("locationMapLink", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-forest/10 pt-6 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: "Carousel Slides" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                const next = [...values.locationSlides];
                next.push({
                  id: `slide-${Date.now()}`,
                  imageId: "",
                  title: "New Slide",
                  figureLabel: `Fig. ${String(next.length + 1).padStart(2, "0")}`
                });
                updateField("locationSlides", next);
              }, className: "px-4 py-2 border border-forest/20 font-mono text-xs uppercase tracking-widest hover:bg-forest hover:text-sand transition-colors", children: "+ Add Slide" })
            ] }),
            values.locationSlides.map((slide, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-forest/10 p-4 bg-white/60 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs uppercase text-forest/60 font-bold", children: [
                  "Slide ",
                  idx + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                    const next = [...values.locationSlides];
                    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                    updateField("locationSlides", next);
                  }, className: "text-xs uppercase font-mono text-forest/60 hover:text-forest", children: "Move Up" }),
                  idx < values.locationSlides.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                    const next = [...values.locationSlides];
                    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
                    updateField("locationSlides", next);
                  }, className: "text-xs uppercase font-mono text-forest/60 hover:text-forest", children: "Move Down" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                    if (values.locationSlides.length <= 1) return;
                    updateField("locationSlides", values.locationSlides.filter((_, i) => i !== idx));
                  }, className: "text-xs uppercase font-mono text-clay hover:text-clay-dark hover:bg-red-500/10 px-2 py-1 rounded transition-colors", children: "Remove" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Slide Title", value: slide.title, onChange: (v) => {
                  const next = [...values.locationSlides];
                  next[idx] = {
                    ...slide,
                    title: v
                  };
                  updateField("locationSlides", next);
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Figure Label", value: slide.figureLabel, onChange: (v) => {
                  const next = [...values.locationSlides];
                  next[idx] = {
                    ...slide,
                    figureLabel: v
                  };
                  updateField("locationSlides", next);
                } })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePickerField, { label: "Slide Image", imageId: slide.imageId || null, previewUrl: resolveMediaUrl(slide.imageId || null), onBrowse: () => setPickerTarget(`locationSlides.${idx}.imageId`), onClear: () => {
                const next = [...values.locationSlides];
                next[idx] = {
                  ...slide,
                  imageId: ""
                };
                updateField("locationSlides", next);
              } })
            ] }, slide.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Donate Section", description: "Bank details and donation messaging", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Heading Line 1", value: values.donateHeadingLineOne, onChange: (v) => updateField("donateHeadingLineOne", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Heading Line 2 (accent)", value: values.donateHeadingLineTwo, onChange: (v) => updateField("donateHeadingLineTwo", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Donation Body Text", value: values.donateBody, onChange: (v) => updateField("donateBody", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Account Name", value: values.donateAccountName, onChange: (v) => updateField("donateAccountName", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Sort Code", value: values.donateSortCode, onChange: (v) => updateField("donateSortCode", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Account Number", value: values.donateAccountNumber, onChange: (v) => updateField("donateAccountNumber", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Inspirational Quote", value: values.donateQuote, onChange: (v) => updateField("donateQuote", v), hint: "Displayed in the decorative panel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Footer", description: "Site footer content and links", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Footer Title Line 1", value: values.footerTitleLineOne, onChange: (v) => updateField("footerTitleLineOne", v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Footer Title Line 2 (italic)", value: values.footerTitleLineTwo, onChange: (v) => updateField("footerTitleLineTwo", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Footer Blurb", value: values.footerBlurb, onChange: (v) => updateField("footerBlurb", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Contact Address", value: values.footerContactAddressLines, onChange: (v) => updateField("footerContactAddressLines", v), hint: "One line per row" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Contact Email", value: values.footerContactEmail, onChange: (v) => updateField("footerContactEmail", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-forest/10 pt-4 mt-2 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: "Menu Links" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateField("footerMenuLinks", [...values.footerMenuLinks, {
                label: "",
                href: ""
              }]), className: "text-xs font-mono uppercase text-forest/60 border border-forest/20 px-3 py-1 hover:bg-forest hover:text-sand transition-colors", children: "+ Add" })
            ] }),
            values.footerMenuLinks.map((link, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Label", value: link.label, onChange: (v) => {
                const next = [...values.footerMenuLinks];
                next[idx] = {
                  ...link,
                  label: v
                };
                updateField("footerMenuLinks", next);
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Link", value: link.href, onChange: (v) => {
                const next = [...values.footerMenuLinks];
                next[idx] = {
                  ...link,
                  href: v
                };
                updateField("footerMenuLinks", next);
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateField("footerMenuLinks", values.footerMenuLinks.filter((_, i) => i !== idx)), className: "text-xs font-mono text-clay hover:bg-red-500/10 px-2 py-1 rounded transition-colors mb-2", children: "Remove" })
            ] }, idx))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-forest/10 pt-4 mt-2 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: "Social Links" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateField("footerSocialLinks", [...values.footerSocialLinks, {
                label: "",
                href: ""
              }]), className: "text-xs font-mono uppercase text-forest/60 border border-forest/20 px-3 py-1 hover:bg-forest hover:text-sand transition-colors", children: "+ Add" })
            ] }),
            values.footerSocialLinks.map((link, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Label", value: link.label, onChange: (v) => {
                const next = [...values.footerSocialLinks];
                next[idx] = {
                  ...link,
                  label: v
                };
                updateField("footerSocialLinks", next);
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "URL", value: link.href, onChange: (v) => {
                const next = [...values.footerSocialLinks];
                next[idx] = {
                  ...link,
                  href: v
                };
                updateField("footerSocialLinks", next);
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateField("footerSocialLinks", values.footerSocialLinks.filter((_, i) => i !== idx)), className: "text-xs font-mono text-clay hover:bg-red-500/10 px-2 py-1 rounded transition-colors mb-2", children: "Remove" })
            ] }, idx))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saveState === "saving", className: "bg-forest text-sand px-8 py-4 font-mono uppercase tracking-widest text-sm disabled:opacity-60 hover:bg-forest-light transition-colors", children: saveState === "saving" ? "Saving..." : "Save & Publish" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: [
            saveState === "saved" && "Saved successfully",
            saveState === "error" && "Save failed - please try again"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MediaManager, { items: mediaItems, onUpload: handleUpload, onDelete: async (mediaId) => {
        await deleteMediaFn({
          data: {
            mediaId
          }
        });
        setMediaItems((prev) => prev.filter((item) => item.id !== mediaId));
      } })
    ] }),
    pickerTarget ? /* @__PURE__ */ jsxRuntimeExports.jsx(MediaPickerModal, { items: mediaItems, onClose: () => setPickerTarget(null), onSelect: handlePickerSelect, onUpload: handleUpload }) : null
  ] });
}
function SectionCard({
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 border border-forest/10 p-6 sm:p-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-forest", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-forest/40 mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children })
  ] });
}
function TextInput({
  label,
  value,
  onChange,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value, onChange: (e) => onChange(e.target.value), className: "border border-forest/20 px-4 py-2 bg-white/70 focus:outline-none focus:border-forest" }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-forest/30 font-mono", children: hint })
  ] });
}
function TimeInput({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value, onChange: (e) => onChange(e.target.value), className: "border border-forest/20 px-4 py-2 bg-white/70 focus:outline-none focus:border-forest" })
  ] });
}
function TextArea({
  label,
  value,
  onChange,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), className: "border border-forest/20 px-4 py-2 bg-white/70 min-h-[100px] focus:outline-none focus:border-forest" }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-forest/30 font-mono", children: hint })
  ] });
}
function ImagePickerField({
  label,
  imageId,
  previewUrl,
  onBrowse,
  onClear
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onBrowse, className: "border border-forest/20 px-4 py-3 bg-white/70 text-left flex items-center gap-4 flex-1 hover:border-forest transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 h-14 border border-forest/10 bg-sand flex items-center justify-center text-xs font-mono text-forest/60 flex-shrink-0 overflow-hidden", children: previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "", className: "w-full h-full object-cover" }) : "None" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-forest/60 block", children: imageId ? "Selected" : "No image selected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-forest truncate block", children: imageId ? `ID: ${imageId.slice(0, 8)}...` : "Click to browse library" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase font-mono text-sand bg-forest px-3 py-1.5 flex-shrink-0", children: "Browse" })
      ] }),
      imageId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClear, className: "text-xs uppercase font-mono text-clay border border-clay/30 px-3 py-1.5 hover:bg-clay hover:text-sand transition-colors", children: "Clear" })
    ] })
  ] });
}
function MediaManager({
  items,
  onUpload,
  onDelete
}) {
  const fileInputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const handleFileChange = async (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 border border-forest/10 p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-forest", children: "Upload Media" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-forest/40", children: "Upload images and documents. Supported: JPG, PNG, GIF, WebP, PDF" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*,.pdf", onChange: handleFileChange, className: "hidden" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), disabled: uploading, className: "px-5 py-2.5 border border-forest/20 font-mono text-xs uppercase tracking-widest text-forest hover:bg-forest hover:text-sand transition-colors disabled:opacity-60 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-base", children: "upload_file" }),
          uploading ? "Uploading..." : "Choose File"
        ] }),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-forest/60", children: "Processing..." })
      ] })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 border border-forest/10 bg-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-forest/40", children: "No media uploaded yet. Upload your first image above." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-forest/10 bg-white/70 overflow-hidden", children: [
      item.mimeType.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.storagePath.startsWith("http") ? item.storagePath : item.storagePath.startsWith("/") ? item.storagePath : `/${item.storagePath}`, alt: item.originalFilename, className: "w-full h-48 object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-48 bg-sand-dark/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-forest/60", children: item.mimeType }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-forest/60 truncate", children: item.originalFilename }),
        deleteConfirm === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-clay", children: "Are you sure?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: async () => {
            try {
              await onDelete(item.id);
            } catch (err) {
              alert(err instanceof Error ? err.message : "Delete failed");
            }
            setDeleteConfirm(null);
          }, className: "text-xs uppercase font-mono text-sand bg-clay px-2 py-1 hover:bg-red-600 transition-colors rounded", children: "Yes, Delete" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDeleteConfirm(null), className: "text-xs uppercase font-mono text-forest/60", children: "Cancel" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDeleteConfirm(item.id), className: "text-xs uppercase font-mono text-clay hover:text-clay-dark hover:bg-red-500/10 px-2 py-1 rounded transition-colors", children: "Delete" })
      ] })
    ] }, item.id)) })
  ] });
}
function MediaPickerModal({
  items,
  onClose,
  onSelect,
  onUpload
}) {
  const fileInputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const handleFileChange = async (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-forest/60 px-4", onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-sand max-w-4xl w-full p-6 space-y-4 border border-forest/20 max-h-[80vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-forest", children: "Select from Media Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "text-sm uppercase font-mono text-forest hover:text-clay", children: "Close" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-forest/10 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-forest/60", children: "Or upload a new file:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*,.pdf", onChange: handleFileChange, className: "hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), disabled: uploading, className: "px-4 py-2 border border-forest/20 font-mono text-xs uppercase tracking-widest text-forest hover:bg-forest hover:text-sand transition-colors disabled:opacity-60 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-base", children: "upload_file" }),
        uploading ? "Uploading..." : "Choose File"
      ] })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-forest/40", children: "No media available. Upload a file above." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onSelect(item.id), className: "border border-forest/10 bg-white/70 text-left hover:border-forest transition-colors group", children: [
      item.mimeType.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.storagePath.startsWith("http") ? item.storagePath : item.storagePath.startsWith("/") ? item.storagePath : `/${item.storagePath}`, alt: item.originalFilename, className: "w-full h-32 object-cover group-hover:opacity-80 transition-opacity" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-32 bg-sand-dark/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-forest/60", children: item.originalFilename.split(".").pop()?.toUpperCase() }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-forest/60 truncate", children: item.originalFilename }) })
    ] }, item.id)) })
  ] }) });
}
export {
  AdminRoute as component
};
