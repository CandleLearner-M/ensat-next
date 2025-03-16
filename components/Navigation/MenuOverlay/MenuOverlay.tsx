import Link from "next/link";
import styles from "./MenuOverlay.module.scss";
import Logo from "@/components/Logo/Logo";
import { motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigation } from "../state/context";
import SideBar from "./SideBar/SideBar";
import { GrFormNext } from "react-icons/gr";

type MenuOverlayProps = {
  initial: { y: string };
  animate: { y: number };
  exit: { y: string };
  transition: { type: string; stiffness: number; damping: number };
  key: string;
};

function MenuOverlay({ ...motionProps }: MenuOverlayProps) {
  return (
    <motion.div className={styles.menu} {...motionProps}>
      <MenuNavBar />
      <SideBar />

      <footer className={styles.menu__footer}>
        <ul>
          <li>
            <span>Liens Rapides</span>
            <GrFormNext className={styles.menu__footer__symbol} />
          </li>
          <li>
            <Link href="/news">Actualités</Link>
          </li>

          <li>
            <Link href="/defenses">Soutenances</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </footer>
    </motion.div>
  );
}
export default MenuOverlay;

function MenuNavBar() {
  const { dispatch } = useNavigation();

  return (
    <nav className={styles.menu__nav}>
      <ul>
        <li>
          <Link href="/" onClick={() => dispatch({ type: "CLOSE_MENU" })}>
            <Logo />
          </Link>
        </li>
        <li onClick={() => dispatch({ type: "CLOSE_MENU" })}>
          <span>Close</span>
          <IoIosCloseCircleOutline size={38} />
        </li>
      </ul>
    </nav>
  );
}
