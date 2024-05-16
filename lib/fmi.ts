import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Locale, i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  guestRoutes,
  sharedRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const { auth } = NextAuth(authConfig);

const HOME_PAGE_URL = "/overview";

function getProtectedRoutes(protectedRoutes: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedRoutes];

  protectedRoutes.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return protectedPathsWithLocale;
}
function getLocale(req: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = i18n.locales.some((locale) =>
    pathname.startsWith(`/${locale}${apiAuthPrefix}`)
  );
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const privateRoutes = ![...guestRoutes, ...sharedRoutes].some((route) =>
    pathname.endsWith(route)
  );

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const protectedPathsWithLocale = getProtectedRoutes(authRoutes, [
    ...i18n.locales,
  ]);
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);
    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          nextUrl
        )
      );
    }
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        nextUrl
      )
    );
  }

  if (isApiAuthRoute) {
    const currentLocale = i18n.locales.find((locale) =>
      pathname.startsWith(`/${locale}`)
    );
    if (currentLocale) {
      const redirectUrl = `/${currentLocale}`;
      return Response.redirect(new URL(redirectUrl, nextUrl));
    }
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && protectedPathsWithLocale.includes(pathname)) {
    let callbackUrl = nextUrl.pathname || "/";

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackurl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});

// Optionally, don't invoke Middleware on some paths

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
