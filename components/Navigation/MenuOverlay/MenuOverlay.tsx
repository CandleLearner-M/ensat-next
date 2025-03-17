import Logo from "@/components/Logo/Logo";
import { useScreenSize } from "@/utils/useScreenSize";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigation } from "../state/context";
import Background from "./Background/Background";
import ContentArea from "./ContentArea/ContentArea";
import styles from "./MenuOverlay.module.scss";
import SideBar from "./SideBar/SideBar";

type MenuOverlayProps = {
  initial: { y: string };
  animate: { y: number };
  exit: { y: string };
  transition: { type: string; stiffness: number; damping: number };
  key: string;
};

function MenuOverlay({ ...motionProps }: MenuOverlayProps) {
  const {
    state: { selectedMenuItem, backgroundImage },
  } = useNavigation();

  const { isDesktop } = useScreenSize();

  return (
    <motion.div className={styles.menu} {...motionProps}>
      <MenuNavBar />
      {isDesktop && backgroundImage && <Background src={backgroundImage} />}
      <SideBar />
      {selectedMenuItem && <ContentArea />}

      <MenuFooter />
    </motion.div>
  );
}
export default MenuOverlay;

function MenuFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const footerItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <footer className={styles.menu__footer}>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.li variants={footerItemVariants}>
          <span>Liens Rapides</span>
          <GrFormNext className={styles.menu__footer__symbol} />
        </motion.li>
        <motion.li variants={footerItemVariants}>
          <Link href="/news">Actualités</Link>
        </motion.li>

        <motion.li variants={footerItemVariants}>
          <Link href="/defenses">Soutenances</Link>
        </motion.li>
        <motion.li variants={footerItemVariants}>
          <Link href="/contact">Contact</Link>
        </motion.li>
      </motion.ul>
    </footer>
  );
}

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
