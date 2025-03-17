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

  const menuItem = navigationData.find((item) => item.id === selectedMenuItem);

  const hasSubmenu = menuItem?.submenu?.some((item) => item.hasSubmenu);

  const submenuItem = menuItem?.submenu?.find(
    (item) => item.label === selectedSubmenuItem
  );

  console.log(menuItem);

  return (
    <div className={styles.contentarea}>
      <ul
        className={`${styles.contentarea__firstsubmenu} ${
          selectedMenuItem === "ensat" ? styles.ensat : ""
        }`}
      >
        {menuItem?.path && (
          <li>
            <MenuItemLink item={menuItem} />
          </li>
        )}
        {menuItem?.submenu?.map((item) => {
          const currentItemSelected = item.label === selectedSubmenuItem;

          return (
            <SubmenuItem
              item={item}
              key={item.id}
              onClick={() => {
                if (item.hasSubmenu) {
                  dispatch({
                    type: "SELECT_SUBMENU_ITEM",
                    payload: !currentItemSelected ? item.label : null,
                  });
                }
              }}
            />
          );
        })}
      </ul>

      {hasSubmenu && (
        <ul className={styles.contentarea__secondsubmenu}>
          {submenuItem?.submenu?.map((item) => {
            return <SubmenuItem item={item} key={item.id} />;
          })}
        </ul>
      )}
    </div>
  );
}

function SubmenuItem({
  item,
  onClick = () => {},
  children,
}: {
  item: NavigationItem;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      <li key={item.id} onClick={onClick}>
        {item.hasSubmenu ? (
          <p className={styles.contentarea__firstsubmenu__item}>
            <span>{item.label}</span>
            <span>
              <MdKeyboardArrowRight />
            </span>
          </p>
        ) : (
          <MenuItemLink item={item} />
        )}
      </li>
      {!!children && <div>{children}</div>}
    </>
  );
}

function MenuItemLink({
  item,
}: {
  item: NavigationItem;
  children?: React.ReactNode;
}) {
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
