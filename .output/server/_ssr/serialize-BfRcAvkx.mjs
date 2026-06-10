const contentToFormValues = (content, scheduleMediaId) => ({
  heroBackgroundImageId: content.hero.backgroundImageId ?? null,
  heroTitleLineOne: content.hero.titleLineOne,
  heroTitleLineTwo: content.hero.titleLineTwo,
  heroTitleLineThree: content.hero.titleLineThree,
  heroSubtitle: content.hero.subtitle,
  jamaatFajr: content.jamaatTimes.find((time) => time.name === "fajr")?.time ?? "",
  jamaatDhuhr: content.jamaatTimes.find((time) => time.name === "dhuhr")?.time ?? "",
  jamaatAsr: content.jamaatTimes.find((time) => time.name === "asr")?.time ?? "",
  jamaatMaghribOffset: content.jamaatTimes.find((time) => time.name === "maghrib")?.offsetMinutes ?? 0,
  jamaatIsha: content.jamaatTimes.find((time) => time.name === "isha")?.time ?? "",
  jamaatJummah: content.jamaatTimes.find((time) => time.name === "jummah")?.time ?? "",
  scheduleMediaId: scheduleMediaId ?? null,
  aboutHeadingLabel: content.about.headingLabel,
  aboutTitleLineOne: content.about.titleLineOne,
  aboutTitleLineTwo: content.about.titleLineTwo,
  aboutMissionLabel: content.about.missionLabel,
  aboutMissionTitle: content.about.missionTitle,
  aboutMissionBody: content.about.missionBody,
  aboutMissionBodySecondary: content.about.missionBodySecondary,
  aboutImageId: content.about.imageId ?? null,
  locationHeadingLabel: content.location.headingLabel,
  locationTitleLineOne: content.location.titleLineOne,
  locationTitleLineTwo: content.location.titleLineTwo,
  locationAddressTitle: content.location.addressTitle,
  locationAddressLines: content.location.addressLines.join("\n"),
  locationParkingLabel: content.location.parkingLabel,
  locationMapLink: content.location.mapLink,
  locationSlides: content.location.slides,
  donateHeadingLineOne: content.donate.headingLineOne,
  donateHeadingLineTwo: content.donate.headingLineTwo,
  donateBody: content.donate.body,
  donateAccountName: content.donate.accountName,
  donateSortCode: content.donate.sortCode,
  donateAccountNumber: content.donate.accountNumber,
  donateQuote: content.donate.quote,
  footerTitleLineOne: content.footer.titleLineOne,
  footerTitleLineTwo: content.footer.titleLineTwo,
  footerBlurb: content.footer.blurb,
  footerMenuLinks: content.footer.menuLinks,
  footerContactAddressLines: content.footer.contactAddressLines.join("\n"),
  footerContactEmail: content.footer.contactEmail,
  footerSocialLinks: content.footer.socialLinks
});
const formValuesToContent = (values) => ({
  hero: {
    titleLineOne: values.heroTitleLineOne,
    titleLineTwo: values.heroTitleLineTwo,
    titleLineThree: values.heroTitleLineThree,
    subtitle: values.heroSubtitle,
    backgroundImageId: values.heroBackgroundImageId
  },
  jamaatTimes: [
    { name: "fajr", kind: "fixed", time: values.jamaatFajr },
    { name: "dhuhr", kind: "fixed", time: values.jamaatDhuhr },
    { name: "asr", kind: "fixed", time: values.jamaatAsr },
    {
      name: "maghrib",
      kind: "sunset",
      offsetMinutes: values.jamaatMaghribOffset
    },
    { name: "isha", kind: "fixed", time: values.jamaatIsha },
    { name: "jummah", kind: "fixed", time: values.jamaatJummah }
  ],
  about: {
    headingLabel: values.aboutHeadingLabel,
    titleLineOne: values.aboutTitleLineOne,
    titleLineTwo: values.aboutTitleLineTwo,
    missionLabel: values.aboutMissionLabel,
    missionTitle: values.aboutMissionTitle,
    missionBody: values.aboutMissionBody,
    missionBodySecondary: values.aboutMissionBodySecondary,
    imageId: values.aboutImageId
  },
  location: {
    headingLabel: values.locationHeadingLabel,
    titleLineOne: values.locationTitleLineOne,
    titleLineTwo: values.locationTitleLineTwo,
    addressTitle: values.locationAddressTitle,
    addressLines: values.locationAddressLines.split("\n").map((line) => line.trim()).filter(Boolean),
    parkingLabel: values.locationParkingLabel,
    mapLink: values.locationMapLink,
    slides: values.locationSlides
  },
  donate: {
    headingLineOne: values.donateHeadingLineOne,
    headingLineTwo: values.donateHeadingLineTwo,
    body: values.donateBody,
    accountName: values.donateAccountName,
    sortCode: values.donateSortCode,
    accountNumber: values.donateAccountNumber,
    quote: values.donateQuote
  },
  footer: {
    titleLineOne: values.footerTitleLineOne,
    titleLineTwo: values.footerTitleLineTwo,
    blurb: values.footerBlurb,
    menuLinks: values.footerMenuLinks,
    contactAddressLines: values.footerContactAddressLines.split("\n").map((line) => line.trim()).filter(Boolean),
    contactEmail: values.footerContactEmail,
    socialLinks: values.footerSocialLinks
  }
});
export {
  contentToFormValues,
  formValuesToContent
};
