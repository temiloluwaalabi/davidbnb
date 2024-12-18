import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Locale, i18n, langDirection } from "@/i18n.config";
import { getTranslations } from "@/lib/dictionaries";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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

// After
type Params = Promise<{ lang: Locale }>;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const lang = (await params).lang;
  const t = await getTranslations(lang);
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={lang} dir={langDirection[lang]}>
        <body className={cn("grainy", inter.className, spaceGrotesk.className)}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
