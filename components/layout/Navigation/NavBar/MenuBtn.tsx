"use client";

import { useScreenSize } from "@/utils/useScreenSize";
import { useTranslations } from "next-intl";
import { TbMenu3 } from "react-icons/tb";
import { useNavigation } from "../state/context";
import styles from "./NavBar.module.scss";

function MenuBtn({ color = "white" }: { color: "black" | "white" }) {
  const { dispatch } = useNavigation();
  const t = useTranslations("Navigation.NavBar");

  const { isTablet, isMobile } = useScreenSize();

  const colors =
    (isTablet || isMobile) && color === "black" ? "text-black" : "text-white";

  return (
    <button
      className={styles.navbar__action}
      onClick={() => dispatch({ type: "OPEN_MENU" })}
      aria-label={t("menu")}
    >
      <div
        className={`flex justify-space-between gap-6 ${colors} transition-all duration-300 ease-in-out ${styles.action}`}
      >
        <TbMenu3 size={33} className={styles.navbar__icon} />
        <span className={styles.navbar__actionText}>{t("menu")}</span>
      </div>
    </button>
  );
}
export default MenuBtn;
