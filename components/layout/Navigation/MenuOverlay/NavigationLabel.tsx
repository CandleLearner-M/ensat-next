"use client";

import { useTranslations } from "next-intl";

function NavigationLabel({ id }: { id: string }) {
  const t = useTranslations(`Navigation.Menu`);
  return <>{t(id)}</>;
}
export default NavigationLabel;
