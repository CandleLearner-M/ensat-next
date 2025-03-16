import Link from "next/link";
import { useNavigation } from "../../state/context";
import navigationData, { NavigationItem } from "../../state/ENSATNavDS";
import styles from "./ContentArea.module.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

function ContentArea() {
  const {
    state: { selectedMenuItem, selectedSubmenuItem },
    dispatch,
  } = useNavigation();

  const menuItems = navigationData.find((item) => item.id === selectedMenuItem);

  const hasSubmenu = menuItems?.submenu?.some((item) => item.hasSubmenu);

  console.log(selectedSubmenuItem);

  return (
    <div className={styles.contentarea}>
      <ul className={styles.contentarea__firstsubmenu}>
        {menuItems?.submenu?.map((item) => (
          <SubmenuItem
            item={item}
            key={item.id}
            onClick={() => {
              if (item.hasSubmenu) {
                dispatch({
                  type: "SELECT_SUBMENU_ITEM",
                  payload:
                    item.label !== selectedMenuItem && !selectedSubmenuItem
                      ? item.label
                      : null,
                });
              }
            }}
          />
        ))}
      </ul>

      {hasSubmenu && <ul className={styles.contentarea__secondsubmenu}></ul>}
    </div>
  );
}

function SubmenuItem({
  item,
  onClick,
}: {
  item: NavigationItem;
  onClick: () => void;
}) {
  return (
    <li key={item.id} onClick={onClick}>
      {item.hasSubmenu ? (
        <p className={styles.contentarea__firstsubmenu__item}>
          <span>{item.label}</span>
          <span>
            <MdKeyboardArrowRight />
          </span>
        </p>
      ) : (
        <Link
          href={item.path}
          className={styles.contentarea__firstsubmenu__item}
        >
          <span>{item.label}</span>
          <span className={styles.icon}>
            <FaArrowRightLong size={15} />
          </span>
        </Link>
      )}
    </li>
  );
}

export default ContentArea;
