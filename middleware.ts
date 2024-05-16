// import { chain } from "@/middlewares/chain";
// import { withAuthMiddleware } from "@/middlewares/middleware1";
// import { withI18nMiddleware } from "@/middlewares/middleware2";

// export default chain([withAuthMiddleware, withI18nMiddleware]);

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

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
import {
  getLocalizedUrl,
  isUrlMissingLocale,
  withoutSuffix,
} from "./lib/utils";

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
function getPublicRoutes(publicRoutes: string[], locales: Locale[]) {
  let publicPathsWithLocale = [...publicRoutes];

  publicRoutes.forEach((route) => {
    locales.forEach(
      (locale) =>
        (publicPathsWithLocale = [
          ...publicPathsWithLocale,
          `/${locale}${route}`,
        ])
    );
  });

  return publicPathsWithLocale;
}
function getLocale(req: NextRequest): string | undefined {
  // Try to get locale from URL
  const urlLocale = i18n.locales.find((locale) =>
    req.nextUrl.pathname.startsWith(`/${locale}`)
  );

  if (urlLocale) return urlLocale;
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const locale = getLocale(req);
  const isLoggedIn = !!req.auth;
  // console.log(isLoggedIn);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isApiAuthRoute = i18n.locales.some((locale) =>
  //   pathname.startsWith(`/${locale}${apiAuthPrefix}`)
  // );
  const guestRoutesWithLocale = getProtectedRoutes(guestRoutes, [
    ...i18n.locales,
  ]);

  const sharedRoutesWithLocale = getProtectedRoutes(sharedRoutes, [
    ...i18n.locales,
  ]);

  const privateRoute = ![
    ...guestRoutesWithLocale,
    ...sharedRoutesWithLocale,
  ].some((route) => pathname.endsWith(route));

  const protectedPathsWithLocale = getProtectedRoutes(authRoutes, [
    ...i18n.locales,
  ]);

  const publicPathsWithLocale = getPublicRoutes(publicRoutes, [
    ...i18n.locales,
  ]);

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname); // after logging in,you should not access it

  const localizedRedirect = (url: string, locale: string | undefined) => {
    let _url = url;
    const isLocaleMissing = isUrlMissingLocale(_url);
    if (isLocaleMissing) {
      _url = getLocalizedUrl(_url, locale ?? i18n.defaultLocale);
    }
    const redirectUrl = new URL(_url, nextUrl).toString();
    return Response.redirect(redirectUrl);
  };
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
  );
  if (isApiAuthRoute) {
    return;
  }
  // console.log("Auth Route", isAuthRoute);

  // if (protectedPathsWithLocale.includes(pathname)) {
  //   if (isLoggedIn) {
  //     const currentLocale = i18n.locales.find((locale) =>
  //       pathname.startsWith(locale === i18n.defaultLocale ? "/" : `/${locale}`)
  //     );

  //     if (currentLocale) {
  //       const localePrefix =
  //         currentLocale === i18n.defaultLocale ? "" : `/${currentLocale}`;
  //       const redirectUrl = `${localePrefix}${DEFAULT_LOGIN_REDIRECT}`;
  //       return Response.redirect(new URL(redirectUrl, nextUrl));
  //     }
  //   }
  //   return;
  // }

  if (!isLoggedIn && privateRoute) {
    // TODO: add locale to the string for callback and redirect
    let redirectUrl = "auth/login";
    if (!(pathname === "/" || pathname === `/${locale}`)) {
      const searchParamsStr = new URLSearchParams({
        redirectTo: withoutSuffix(pathname, "/"),
      }).toString();

      redirectUrl += `?${searchParamsStr}`;
      return localizedRedirect(redirectUrl, locale);
    }
    return;
  }

  // If the user is logged in and is trying to access root page, redirect to the home page
  const isRequestedRouteIsGuestRoute = guestRoutesWithLocale.some((route) =>
    pathname.endsWith(route)
  );

  if (isLoggedIn && isRequestedRouteIsGuestRoute) {
    return localizedRedirect(HOME_PAGE_URL, locale);
  }

  // If the user is logged in and is trying to access root page, redirect to the home page
  if (pathname === "/" || pathname === `/${locale}`) {
    return localizedRedirect(HOME_PAGE_URL, locale);
  }

  return isUrlMissingLocale(pathname)
    ? localizedRedirect(pathname, locale)
    : NextResponse.next();
  // if (pathnameIsMissingLocale) {
  //   const locale = getLocale(req);
  //   // if (locale === i18n.defaultLocale) {
  //   //   return NextResponse.rewrite(
  //   //     new URL(
  //   //       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
  //   //       nextUrl
  //   //     )
  //   //   );
  //   // }
  //   return NextResponse.redirect(
  //     new URL(
  //       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
  //       nextUrl
  //     )
  //   );
  // }
});

// Optionally, don't invoke Middleware on some paths

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
