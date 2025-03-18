import { useNavigation } from "@/components/Navigation/state/context";
import navigationData from "@/components/Navigation/state/ENSATNavDS";

export function useSelectedMenuItem() {
  const { state } = useNavigation();
  const { selectedMenuItem, selectedSubmenuItem, selectedLevelThreeItem } =
    state;

  const menuItem = navigationData.find((item) => item.id === selectedMenuItem);

  const hasSubmenu = menuItem?.submenu?.some((item) => item.hasSubmenu);

  const subMenuItem = menuItem?.submenu?.find(
    (item) => item.id === selectedSubmenuItem
  );

  const menuLevelThreeItem = subMenuItem?.submenu?.find(
    (item) => item.id === selectedLevelThreeItem
  );

  return { menuItem, subMenuItem, menuLevelThreeItem, hasSubmenu };
}
