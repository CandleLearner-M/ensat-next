import { useScreenSize } from "@/utils/useScreenSize";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigation } from "../../state/context";
import navigationData from "../../state/ENSATNavDS";
import { FirstLevelMenu } from "../ContentArea/ContentArea";
import styles from "./SideBar.module.scss";
import NavigationLabel from "../NavigationLabel";

function SideBar() {
  const {
    state: { selectedMenuItem },
    dispatch,
  } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const { isMobile } = useScreenSize();

  // Set menu to open after component mounts to trigger animation
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Container animation (parent)
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

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className={styles.sidebar}>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
      >
        {navigationData.map((item) => {
          const isSelected = selectedMenuItem === item.id;

          console.log(item);

          return (
            <motion.li
              key={item.id}
              className={
                selectedMenuItem && !isSelected ? styles.sidebar__grayedout : ""
              }
              variants={menuItemVariants}
            >
              <h3
                onClick={() =>
                  dispatch({
                    type: "SELECT_MENU_ITEM",
                    payload: !isSelected
                      ? { id: item.id, image: item.image || "" }
                      : { id: null, image: null },
                  })
                }
                className={isSelected ? styles.sidebar__selected : ""}
              >
                <NavigationLabel id={item?.translationKey ?? item.id} />
              </h3>
              {isMobile && isSelected && <FirstLevelMenu />}
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export default SideBar;
