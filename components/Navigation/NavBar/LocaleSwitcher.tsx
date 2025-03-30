import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [justChanged, setJustChanged] = useState(false);

  const t = useTranslations("loading");

  // Show success message after language change
  useEffect(() => {
    if (justChanged) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setJustChanged(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [justChanged]);

  // Check if we just navigated
  useEffect(() => {
    const handleRouteChange = () => {
      if (isPending) {
        setJustChanged(true);
      }
    };
    
    // This will run when component mounts after navigation
    if (window.performance) {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && navEntries[0].type === "navigate") {
        setJustChanged(true);
      }
    }

    window.addEventListener('routeChangeComplete', handleRouteChange);
    return () => window.removeEventListener('routeChangeComplete', handleRouteChange);
  }, [isPending]);

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
            className="fixed top-0 left-0 right-0 z-50 bg-[#002efe] text-white text-xs py-1 text-center flex items-center justify-center overflow-hidden"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex items-center"
              animate={{ x: ["-100%", "0%"] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
              
              <motion.div className="flex space-x-1 ml-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 w-1.5 bg-white rounded-full"
                    animate={{ 
                      scale: [0.5, 1, 0.5],
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        
        {showSuccess && !isPending && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white text-xs py-1 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              setTimeout(() => setShowSuccess(false), 1500);
            }}
          >
            <motion.div 
              animate={{ opacity: [0, 1], x: [10, 0] }}
              transition={{ duration: 0.3 }}
            >
              {locale === "en" ? "English language loaded" : "Langue française chargée"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LocaleSwitcher;