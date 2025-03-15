import Link from "next/link";
import styles from "./MenuOverlay.module.scss";
import Logo from "@/components/Logo/Logo";
import { motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigation } from "../state/context";

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
    </motion.div>
  );
}
export default MenuOverlay;

function MenuNavBar() {
  const { dispatch } = useNavigation();

  return (
    <nav className={styles.sliding_menu_nav}>
      <ul>
        <li>
          <Link href="/">
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
