export const langDirection = {
  en: "ltr",
  fr: "ltr",
  it: "ltr",
  hi: "ltr",
  ar: "rtl",
} as const;
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr", "ar", "it", "hi"],
  langDirection: langDirection,
} as const;

export type Locale = (typeof i18n)["locales"][number];
export type LangDirection = typeof langDirection;
