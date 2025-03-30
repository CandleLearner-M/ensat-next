"use client";

import { TbMenu3 } from "react-icons/tb";
import { useNavigation } from "../state/context";
import styles from "./NavBar.module.scss";
import { useTranslations } from "next-intl";

function MenuBtn() {
  const { dispatch } = useNavigation();
  const t = useTranslations("Navigation.NavBar");

  return (
    <button
      className={styles.navbar__action}
      onClick={() => dispatch({ type: "OPEN_MENU" })}
      aria-label={t("menu")}
    >
      <TbMenu3 size={33} className={styles.navbar__icon} />
      <span className={styles.navbar__actionText}>{t("menu")}</span>
    </button>
  );
}
export default MenuBtn;
