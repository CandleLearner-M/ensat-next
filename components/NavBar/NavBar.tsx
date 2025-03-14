import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.scss";
import { TbMenu3 } from "react-icons/tb";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li >
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
        </li>
        <li className={styles.right_part}>
          <Link href="/" className={styles.right_part_left}>
            <FiSearch size={30} />
            <span>Search</span>
          </Link>

          <Link href="/" className={styles.right_part_right}>
            <TbMenu3 size={33} />
            <span>Menu</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
