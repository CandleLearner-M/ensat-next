import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import Logo from "../../Logo/Logo";
import styles from "./NavBar.module.scss";
import { TbMenu3 } from "react-icons/tb";
import { useNavigation } from "../state/context";

function NavBar() {
  const { dispatch } = useNavigation();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <a href="/" className={styles.logo}>
            <Logo />
          </a>
        </li>
        <li className={styles.right_part}>
          <div className={styles.right_part_left}>
            <FiSearch size={30} />
            <span>Search</span>
          </div>

          <div
            className={styles.right_part_right}
            onClick={() => dispatch({ type: "OPEN_MENU" })}
          >
            <TbMenu3 size={33} />
            <span>Menu</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
