import { Link, useRouter } from "@/i18n/navigation"; // Replace next/link with i18n Link
import { useSelectedMenuItem } from "@/utils/useSelectedItems";
import { motion } from "framer-motion";
import React, { ReactNode, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigation } from "../../state/context";
import { NavigationItem } from "../../state/ENSATNavDS";
import NavigationLabel from "../NavigationLabel";
import styles from "./ContentArea.module.scss";

function ContentArea() {
  const { hasSubmenu, subMenuItem, menuItem } = useSelectedMenuItem();

  return (
    <div className={styles.contentarea}>
      {menuItem && <FirstLevelMenu />}

      {hasSubmenu && subMenuItem && <SecondLevelMenu key={subMenuItem.id} />}
    </div>
  );
}

export function FirstLevelMenu({ returnBtn = false }: { returnBtn?: boolean }) {
  const {
    state: { selectedMenuItem, selectedSubmenuItem },
    dispatch,
  } = useNavigation();

  const { menuItem, subMenuItem } = useSelectedMenuItem();

  const onSubMenuSelect = (item: NavigationItem) => {
    const isCurrentlySelected = item.id === selectedSubmenuItem;
    dispatch({
      type: "SELECT_SUBMENU_ITEM",
      payload: isCurrentlySelected ? null : item.id,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${styles.contentarea__firstsubmenu} ${
        selectedMenuItem === "ensat" ? styles.ensat : ""
      }`}
    >
      {returnBtn && (
        <>
          <motion.div
            className={styles.backbtn}
            onClick={() =>
              dispatch({ type: "SELECT_SUBMENU_ITEM", payload: null })
            }
          >
            <IoIosArrowDropleft size={20} />
            <span>
              {subMenuItem && (
                <NavigationLabel
                  id={subMenuItem?.translationKey ?? subMenuItem?.id}
                />
              )}
            </span>
          </motion.div>
        </>
      )}
      {menuItem?.path && (
        <motion.li
          variants={menuItemVariants}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          <MenuItemLink item={menuItem} />
        </motion.li>
      )}
      {menuItem?.submenu?.map((item) => {
        return (
          <SubmenuItem
            item={item}
            key={item.id}
            isSelected={item.id === selectedSubmenuItem}
            onClick={() => {
              if (item.hasSubmenu) {
                onSubMenuSelect(item);
              }
            }}
          />
        );
      })}
    </motion.ul>
  );
}

export function SecondLevelMenu({
  returnBtn = false,
}: {
  returnBtn?: boolean;
}) {
  const {
    state: { selectedLevelThreeItem },
    dispatch,
  } = useNavigation();

  const { subMenuItem, menuLevelThreeItem } = useSelectedMenuItem();

  const onLevelThreeSelect = (item: NavigationItem) => {
    const isCurrentlySelected = item.id === selectedLevelThreeItem;
    dispatch({
      type: "SELECT_LEVEL_THREE_ITEM",
      payload: isCurrentlySelected ? null : item.id,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={styles.contentarea__secondsubmenu}
    >
      {returnBtn && (
        <>
          <motion.div
            className={styles.backbtn}
            onClick={() =>
              dispatch({ type: "SELECT_SUBMENU_ITEM", payload: null })
            }
          >
            <IoIosArrowDropleft size={20} />
            <span>
              {subMenuItem && (
                <NavigationLabel
                  id={subMenuItem?.translationKey ?? subMenuItem?.id}
                />
              )}
            </span>
          </motion.div>
        </>
      )}
      {subMenuItem?.submenu?.map((item) => {
        const isSelected = item.id === selectedLevelThreeItem;
        return (
          <SubmenuItem
            item={item}
            key={item.id}
            isSelected={isSelected}
            onClick={() => {
              if (item.hasSubmenu) onLevelThreeSelect(item);
            }}
            level={2}
          >
            {isSelected &&
              menuLevelThreeItem?.submenu?.map((item) => {
                return <SubmenuItem item={item} key={item.id} level={3} />;
              })}
          </SubmenuItem>
        );
      })}
    </motion.ul>
  );
}

interface SubmenuItemProps {
  item: NavigationItem;
  onClick?: () => void;
  children?: React.ReactNode;
  isSelected?: boolean;
  level?: number;
}

function SubmenuItem({
  item,
  onClick = () => {},
  children,
  isSelected,
  level = 1,
}: SubmenuItemProps) {
  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
    },

    visible: {
      opacity: 1,
      height: "auto",
      overflow: "visible",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        opacity: { duration: 0.2 },
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.li
        variants={menuItemVariants}
        key={item.id}
        onClick={onClick}
        className={isSelected ? styles.selected : ""}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
      >
        {item.hasSubmenu ? (
          <p className={styles.contentarea__firstsubmenu__item}>
            <span>
              <NavigationLabel id={item?.translationKey ?? item.id} />
            </span>
            <span>
              <MdKeyboardArrowRight
                className={
                  !isSelected || level === 1
                    ? styles.icon
                    : `${styles.rotate} ${styles.icon}`
                }
              />
            </span>
          </p>
        ) : (
          <MenuItemLink item={item} level={level} />
        )}
      </motion.li>
      {!!children && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={dropdownVariants}
          className={styles.dropdown}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

function MenuItemLink({ item }: { item: NavigationItem; level?: number }) {
  const isPDF = item.path.endsWith(".pdf");

  if (isPDF) {
    return (
      <PDFLink
        path={item.path}
        className={styles.contentarea__firstsubmenu__item}
      >
        <span>
          <NavigationLabel id={item?.translationKey ?? item.id} />
        </span>
        <span className={styles.icon}>
          <FaArrowRightLong size={15} />
        </span>
      </PDFLink>
    );
  }
  return (
    <Link href={item.path} className={styles.contentarea__firstsubmenu__item}>
      <span>
        <NavigationLabel id={item?.translationKey ?? item.id} />
      </span>
      <span className={styles.icon}>
        <FaArrowRightLong size={15} />
      </span>
    </Link>
  );
}

export function PDFLink({
  path,
  children,
  className,
}: {
  path: string;
  children: ReactNode;
  className: string;
}) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    router.prefetch("/");

    setTimeout(() => {
      if (linkRef.current) {
        window.open(path, "_blank");
      }
    }, 300);
  };

  return (
    <a
      ref={linkRef}
      href={path}
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default ContentArea;
