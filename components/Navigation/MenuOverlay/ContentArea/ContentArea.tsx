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
      <FirstLevelMenu
        menuItem={menuItem}
        selectedMenuItem={selectedMenuItem}
        selectedSubmenuItem={selectedSubmenuItem}
        onSubMenuSelect={handlerSubMenuSelect}
      />

      {hasSubmenu && (
        <SecondLevelMenu
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

function FirstLevelMenu({
  menuItem,
  selectedMenuItem,
  selectedSubmenuItem,
  onSubMenuSelect,
}: FirstLevelMenuProps) {
  if (!menuItem) return null;

  return (
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
      {menuItem.submenu?.map((item) => {
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
    </ul>
  );
}

interface SecondLevelMenuProps {
  subMenuItem: NavigationItem | undefined;
  selectedLevelThreeItem: string | null;
  menuLevelThreeItem: NavigationItem | undefined;
  onLevelThreeSelect: (item: NavigationItem) => void;
}

function SecondLevelMenu({
  subMenuItem,
  selectedLevelThreeItem,
  menuLevelThreeItem,
  onLevelThreeSelect,
}: SecondLevelMenuProps) {
  if (!subMenuItem) return null;

  return (
    <ul className={styles.contentarea__secondsubmenu}>
      {subMenuItem.submenu?.map((item) => {
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
                return <SubmenuItem item={item} key={item.id} />;
              })}
          </SubmenuItem>
        );
      })}
    </ul>
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
  return (
    <>
      <li
        key={item.id}
        onClick={onClick}
        className={isSelected ? styles.selected : ""}
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
      </li>
      {!!children && <div>{children}</div>}
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
