// import { CustomMiddleware } from "./chain";

import NextAuth from "next-auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Locale, i18n } from "@/i18n.config";

// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  guestRoutes,
  sharedRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { CustomMiddleware } from "./chain";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// const HOME_PAGE_URL = "/overview";
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

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    const isLoggedIn = await getToken({
      req: req,
      salt: "",
      secret: "345frv",
    });

    const isApiAuthRoute = i18n.locales.some((locale) =>
      pathname.startsWith(`/${locale}${apiAuthPrefix}`)
    );
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);
    const privateRoutes = ![...guestRoutes, ...sharedRoutes].some((route) =>
      pathname.endsWith(route)
    );

    // const pathnameIsMissingLocale = i18n.locales.every(
    //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    // );

    const protectedPathsWithLocale = getProtectedRoutes(authRoutes, [
      ...i18n.locales,
    ]);
    // Redirect if there is no locale
    // if (pathnameIsMissingLocale) {
    //   const locale = getLocale(req);
    //   if (locale === i18n.defaultLocale) {
    //     return NextResponse.rewrite(
    //       new URL(
    //         `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
    //         nextUrl
    //       )
    //     );
    //   }
    //   return NextResponse.redirect(
    //     new URL(
    //       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
    //       nextUrl
    //     )
    //   );
    // }
    // Redirect if there is no locale

    // if (isApiAuthRoute) {
    //   // If it's an API auth route, remove the locale prefix
    //   const cleanPathname = pathname.replace(`/${locale}`, "");
    //   return Response.redirect(new URL(cleanPathname, nextUrl));
    // }
    // if (isApiAuthRoute) {
    //   let redirectUrl: string;

    //   // If the pathname is "/", redirect to the default locale or "/"
    //   if (pathname == "/") {
    //     redirectUrl = `/${i18n.defaultLocale}`;
    //   } else {
    //     // Otherwise, extract the locale from the pathname
    //     const currentLocale = i18n.locales.find((locale) =>
    //       pathname.startsWith(`/${locale}`)
    //     );

    //     if (currentLocale) {
    //       // If the locale is valid, construct the redirect URL with the locale prefix
    //       redirectUrl = `/${currentLocale}`;
    //     } else {
    //       // If no locale is found, default to the default locale
    //       redirectUrl = `/${i18n.defaultLocale}`;
    //     }
    //   }

    //   return Response.redirect(new URL(redirectUrl, nextUrl));
    // }
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
    return middleware(req, event, response);
  };
}
