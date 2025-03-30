import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("loading");

  const onClick = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    startTransition(() => {
      router.push(pathname, { locale: newLocale });
    });
  };

  return (
    <>
      <label className="swap text-white !mr-4" onClick={onClick}>
        <input type="checkbox" checked={locale === "en"} readOnly />
        <div className="swap-on">EN</div>
        <div className="swap-off">FR</div>
      </label>

      <AnimatePresence>
        {isPending && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-[#002efe] text-white text-xs py-1 text-center flex items-center justify-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.span
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {t("language")}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LocaleSwitcher;
