"use client";

import Navigation from "@/components/Navigation/Navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations("NotFound");

  redirect(`/${defaultLocale}/not-found-page`);
  return (
    <>
      <Navigation />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-6">40</h1>
        <h2 className="text-2xl font-medium mb-4">{t("pageNotFound")}</h2>
        <p className="text-gray-600 mb-8">{t("pageNotFoundDesc")}</p>
        <Link
          href="/"
          locale={locale}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t("backToHome")}
        </Link>
      </div>
    </>
  );
}
