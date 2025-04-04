import { FiSearch } from "react-icons/fi";
import Logo from "../../Logo/Logo";
import MenuBtn from "./MenuBtn";
import styles from "./NavBar.module.scss";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import SwapUp from "@/components/common/SwapUp";

function NavBar() {
  const t = useTranslations("Navigation.NavBar");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__brand}>
          <Link href="/" className={styles.navbar__logo}>
            <Logo />
          </Link>
        </div>

        <div className={styles.navbar__actions}>
          <LocaleSwitcher />

          <button className={styles.navbar__action} aria-label={t("search")}>
            <SwapUp custom={true}>
              <div className="flex justify-space-between gap-6">
                <FiSearch size={30} className={styles.navbar__icon} />
                <span className={`${styles.navbar__actionText}  `}>
                  {t("search")}
                </span>
              </div>
            </SwapUp>
          </button>

          <MenuBtn />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
