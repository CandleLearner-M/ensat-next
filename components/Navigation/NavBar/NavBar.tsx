import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Logo from "../../Logo/Logo";
import MenuBtn from "./MenuBtn";
import styles from "./NavBar.module.scss";

function NavBar() {
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

          <MenuBtn />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
