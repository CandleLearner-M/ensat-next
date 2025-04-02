"use client";

import { TbMenu3 } from "react-icons/tb";
import { useNavigation } from "../state/context";
import styles from "./NavBar.module.scss";
import { useTranslations } from "next-intl";
import SwapUp from "@/components/common/SwapUp";

function MenuBtn() {
  const { dispatch } = useNavigation();
  const t = useTranslations("Navigation.NavBar");

  return (
    <button
      className={styles.navbar__action}
      onClick={() => dispatch({ type: "OPEN_MENU" })}
      aria-label={t("menu")}
    >
      <SwapUp custom={true}>
        <div className="flex justify-space-between gap-6">
          <TbMenu3 size={33} className={styles.navbar__icon} />
          <span className={styles.navbar__actionText}>{t("menu")}</span>
        </div>
      </SwapUp>
    </button>
  );
}
export default MenuBtn;
