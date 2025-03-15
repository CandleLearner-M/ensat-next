import Link from "next/link";
import styles from "./MenuOverlay.module.scss";
import Logo from "@/components/Logo/Logo";
import { IoIosCloseCircleOutline } from "react-icons/io";

function MenuOverlay() {
  return (
    <div className={styles.menu}>
      <nav className={styles.sliding_menu_nav}>
        <ul>
          <li>
            <Link href="/">
              <Logo />
            </Link>
          </li>
          <li>
            <span>Close</span>
            <IoIosCloseCircleOutline size={38} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default MenuOverlay;
