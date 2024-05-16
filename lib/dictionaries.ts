"use server";
import type { Locale } from "@/i18n.config";
import { _t } from "./utils";

const dictionaries = {
  en: () =>
    import("@/dictionaries/en/en.json").then((module) => module.default),
  fr: () =>
    import("@/dictionaries/fr/fr.json").then((module) => module.default),
  ar: () =>
    import("@/dictionaries/ar/ar.json").then((module) => module.default),
  hi: () =>
    import("@/dictionaries/hi/hi.json").then((module) => module.default),
  it: () =>
    import("@/dictionaries/it/it.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Translator = (key: string) => string;

export const getTranslations = async (locale: Locale): Promise<Translator> => {
  const dict = await getDictionary(locale);
  return (key: string) => _t(key, dict);
};
