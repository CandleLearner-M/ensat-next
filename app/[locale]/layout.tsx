import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Navigation from "@/components/layout/Navigation/Navigation";
import { canelaDeck, outfit } from "@/lib/fonts";

import type { Metadata } from "next";
import "./globals.scss";
import NextTopLoader from "nextjs-toploader";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles = {
    en: "ENSAT - National School of Applied Sciences of Tangier",
    fr: "ENSAT - École Nationale des Sciences Appliquées de Tanger",
  };

  const descriptions = {
    en: "Official website of ENSAT",
    fr: "Site officiel de l'ENSAT",
  };

  const resolvedParams = await params;

  const locale = resolvedParams.locale as keyof typeof titles;

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    icons: {
      icon: "/favicon.ico",
    },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${canelaDeck.variable} ${outfit.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextTopLoader color="#002efe" showSpinner={false} />
          <Navigation />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
