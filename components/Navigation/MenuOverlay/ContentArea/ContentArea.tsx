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

  const submenuItems = menuItems?.submenu?.find(
    (item) => item.label === selectedSubmenuItem
  );

  console.log(submenuItems);

  return (
    <div className={styles.contentarea}>
      <ul
        className={`${styles.contentarea__firstsubmenu} ${
          selectedMenuItem === "ensat" ? styles.ensat : ""
        }`}
      >
        {menuItems?.submenu?.map((item) => {
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
          {submenuItems?.submenu?.map((item) => {
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
      {!!children && <div>{children}</div>}
    </>
  );
}

export default ContentArea;
