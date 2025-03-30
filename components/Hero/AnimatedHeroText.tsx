import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function AnimatedHeroText({ isVisible, className }: { isVisible: boolean; className: string }) {

  const t = useTranslations("Hero");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h1 variants={fadeInUp}>{t("title")}</motion.h1>
      <motion.p variants={fadeInUp} transition={{ delay: 0.2 }}>
        {t("description")}
      </motion.p>
    </motion.div>
  );
}

export default AnimatedHeroText;
