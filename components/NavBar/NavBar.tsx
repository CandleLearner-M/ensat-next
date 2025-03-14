import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import Logo from "../Logo/Logo";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <Logo />
          </Link>
        </li>
        <li className={styles.right_part}>
          <div className={styles.right_part_left}>
            <span>
              <BiSearch />
              Search
            </span>
          </div>

          <div className={styles.right_part_right}></div>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
