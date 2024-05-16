"use client";
import { Locale, i18n } from "@/i18n.config";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { getDictionary } from "./dictionaries";

export interface Categories {
  [key: string]: string | string[] | Categories;
}

const useCategoryValues = (): ((
  fieldName: string,
  categoryName: string
) => string | string[] | Categories) => {
  const params = useParams();
  let lang: Locale;
  const transCategoriesRef = useRef<Categories | null>(null);

  if (Array.isArray(params.lang)) {
    lang = params.lang[0] as Locale;
  } else {
    lang = params.lang as Locale;
  }

  if (!i18n.locales.includes(lang)) {
    lang = i18n.defaultLocale;
  }

  const dictionary = useMemo(() => {
    const fetchDictionary = async (lang: Locale) => {
      const response = await getDictionary(lang);
      transCategoriesRef.current = response; // Assigning full response to transCategoriesRef
      console.log(transCategoriesRef.current);
      return response;
    };

    return fetchDictionary;
  }, []);

  useEffect(() => {
    dictionary(lang);
  }, [dictionary, lang]);

  // Function to get the value of a specific category
  const getCategoryValue = (
    fieldName: string,
    categoryName: string
  ): string | string[] | Categories => {
    const field =
      transCategoriesRef.current && transCategoriesRef.current[fieldName];
    if (typeof field === "object" && field !== null) {
      return (field as Categories)[categoryName];
    }
    return "";
  };

  return getCategoryValue;
};

export default useCategoryValues;
