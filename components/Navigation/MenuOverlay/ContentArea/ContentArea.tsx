import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigation } from "../../state/context";
import navigationData, { NavigationItem } from "../../state/ENSATNavDS";
import styles from "./ContentArea.module.scss";

function ContentArea() {
  const { state, dispatch } = useNavigation();
  const { selectedMenuItem, selectedSubmenuItem, selectedLevelThreeItem } =
    state;

  const findSelectedElements = () => {
    const menuItem = navigationData.find(
      (item) => item.id === selectedMenuItem
    );
    const hasSubmenu = menuItem?.submenu?.some((item) => item.hasSubmenu);

    const subMenuItem = menuItem?.submenu?.find(
      (item) => item.id === selectedSubmenuItem
    );

    const menuLevelThreeItem = subMenuItem?.submenu?.find(
      (item) => item.id === selectedLevelThreeItem
    );

    return { menuItem, subMenuItem, menuLevelThreeItem, hasSubmenu };
  };

  const { menuItem, subMenuItem, menuLevelThreeItem, hasSubmenu } =
    findSelectedElements();

  const handlerSubMenuSelect = (item: NavigationItem) => {
    const isCurrentlySelected = item.id === selectedSubmenuItem;
    dispatch({
      type: "SELECT_SUBMENU_ITEM",
      payload: isCurrentlySelected ? null : item.id,
    });
  };

  const handlerLevelThreeSelect = (item: NavigationItem) => {
    const isCurrentlySelected = item.id === selectedLevelThreeItem;
    dispatch({
      type: "SELECT_LEVEL_THREE_ITEM",
      payload: isCurrentlySelected ? null : item.id,
    });
  };

  return (
    <div className={styles.contentarea}>
      {menuItem && (
        <FirstLevelMenu
          menuItem={menuItem}
          key={menuItem.id}
          selectedMenuItem={selectedMenuItem}
          selectedSubmenuItem={selectedSubmenuItem}
          onSubMenuSelect={handlerSubMenuSelect}
        />
      )}

      {hasSubmenu && subMenuItem && (
        <SecondLevelMenu
          key={subMenuItem.id}
          subMenuItem={subMenuItem}
          selectedLevelThreeItem={selectedLevelThreeItem}
          menuLevelThreeItem={menuLevelThreeItem}
          onLevelThreeSelect={handlerLevelThreeSelect}
        />
      )}
    </div>
  );
}

interface FirstLevelMenuProps {
  menuItem: NavigationItem | undefined;
  selectedMenuItem: string | null;
  selectedSubmenuItem: string | null;
  onSubMenuSelect: (item: NavigationItem) => void;
}

export function FirstLevelMenu({
  menuItem,
  selectedMenuItem,
  selectedSubmenuItem,
  onSubMenuSelect,
}: FirstLevelMenuProps) {
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

interface SecondLevelMenuProps {
  subMenuItem: NavigationItem | undefined;
  selectedLevelThreeItem: string | null;
  menuLevelThreeItem: NavigationItem | undefined;
  onLevelThreeSelect: (item: NavigationItem) => void;
}

export function SecondLevelMenu({
  subMenuItem,
  selectedLevelThreeItem,
  menuLevelThreeItem,
  onLevelThreeSelect,
}: SecondLevelMenuProps) {
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
            <span>{item.label}</span>
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
          <MenuItemLink item={item} />
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

function MenuItemLink({ item }: { item: NavigationItem }) {
  return (
    <Link href={item.path} className={styles.contentarea__firstsubmenu__item}>
      <span>{item.label}</span>
      <span className={styles.icon}>
        <FaArrowRightLong size={15} />
      </span>
    </Link>
  );
}

export default ContentArea;
