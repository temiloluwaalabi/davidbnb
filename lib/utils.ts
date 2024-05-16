import { i18n } from "@/i18n.config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDictionary } from "./dictionaries";
import { type Primitive, type ZodLiteral, type RawCreateParams } from "zod";
import * as z from "zod";
import { parsePhoneNumberWithError } from "libphonenumber-js/min";
export type Dict = {
  [key: string]: string | Dict;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MappedZodLiterals<T extends readonly Primitive[]> = {
  -readonly [K in keyof T]: ZodLiteral<T[K]>;
};
export const ensurePrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str : `${prefix}${str}`;
export const withoutSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
export const withoutPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const isUrlMissingLocale = (url: string) => {
  return i18n.locales.every(
    (locale) => !(url.startsWith(`/${locale}`) || url === `/${locale}`)
  );
};

export const getLocalizedUrl = (url: string, languageCode: string): string => {
  if (!url || !languageCode)
    throw new Error("URL or Language code can't be empty");

  return isUrlMissingLocale(url)
    ? `/${languageCode}${ensurePrefix(url, "/")}`
    : url;
};

function getFromDictionnary(
  keys: Array<string>,
  dict: Dict | string
): Dict | string {
  if (typeof dict === "string") {
    return dict;
  }

  if (keys.length === 0) {
    return "";
  }

  if (!dict) {
    return "";
  }

  const key = keys.shift() || "";
  return getFromDictionnary(keys, dict[key]);
}

export const _t = (key: string, dict: Dict): string => {
  if (!key) {
    return "";
  }

  const keys = key.split(".");

  const ret = getFromDictionnary(keys, dict);

  if (!ret) {
    return key;
  }

  if (typeof ret !== "string") {
    console.error("getFromDIct returned a " + typeof ret);
    return key;
  }

  return ret;
};

export function createManyUnion<
  A extends Readonly<[Primitive, Primitive, ...Primitive[]]>
>(literals: A, params?: RawCreateParams) {
  return z.union(
    literals.map((value) => z.literal(value)) as MappedZodLiterals<A>,
    params
  );
}

export const formatPhoneNumberInternational = (
  phoneNumber: ReturnType<typeof parsePhoneNumberWithError>
): string => {
  return phoneNumber.formatInternational().replace(/\s+/g, "");
};

export const maskEmail = (email: string) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return email;
  }

  const [username, domain] = email.split("@");
  const domainParts = domain.split(".");
  const lastWordsBeforeDot = domainParts[domainParts.length - 2];
  const maskedUsername = maskString(username.substring(0, 2));
  const maskedDomain = maskString(lastWordsBeforeDot.substring(0, 2));

  return `${maskedUsername}@${maskedDomain}.${
    domainParts[domainParts.length - 1]
  }`;
};
export const maskString = (str: string) => {
  return str.substring(0, 2) + "●●●●";
};
