import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { TbMenu3 } from "react-icons/tb";
import Logo from "../../Logo/Logo";
import { useNavigation } from "../state/context";
import styles from "./NavBar.module.scss";

function NavBar() {
  const { dispatch } = useNavigation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__brand}>
          {/* Use Link normally without onClick handler */}
          <Link href="/" className={styles.navbar__logo}>
            <Logo />
          </Link>
        </div>
        <div className={styles.navbar__actions}>
          <button className={styles.navbar__action} aria-label="Search">
            <FiSearch size={30} className={styles.navbar__icon} />
            <span className={styles.navbar__actionText}>Search</span>
          </button>

          <button
            className={styles.navbar__action}
            onClick={() => dispatch({ type: "OPEN_MENU" })}
            aria-label="Menu"
          >
            <TbMenu3 size={33} className={styles.navbar__icon} />
            <span className={styles.navbar__actionText}>Menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
