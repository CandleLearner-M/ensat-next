"use client";

import { TbMenu3 } from "react-icons/tb";
import { useNavigation } from "../state/context";
import styles from "./NavBar.module.scss";

function MenuBtn() {
  const { dispatch } = useNavigation();
  return (
    <button
      className={styles.navbar__action}
      onClick={() => dispatch({ type: "OPEN_MENU" })}
      aria-label="Menu"
    >
      <TbMenu3 size={33} className={styles.navbar__icon} />
      <span className={styles.navbar__actionText}>Menu</span>
    </button>
  );
}
export default MenuBtn;
