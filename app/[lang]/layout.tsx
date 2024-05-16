import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { cn } from "@/lib/utils";
import { Locale, i18n, langDirection } from "@/i18n.config";
import { getTranslations } from "@/lib/dictionaries";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}>) {
  const t = await getTranslations(params.lang);
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={params.lang} dir={langDirection[params.lang]}>
        <body className={cn("grainy", inter.className, spaceGrotesk.className)}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}