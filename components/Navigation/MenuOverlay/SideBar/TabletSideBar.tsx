import { useNavigation } from "../../state/context";
import { FirstLevelMenu, SecondLevelMenu } from "../ContentArea/ContentArea";
import SideBar from "./SideBar";

function TabletSideBar() {
  const {
    state: { selectedMenuItem, selectedSubmenuItem },
  } = useNavigation();

  return (
    <>
      {selectedMenuItem && !selectedSubmenuItem ? (
        <>
          <SideBar />
          <FirstLevelMenu />
        </>
      ) : selectedSubmenuItem ? (
        <>
          <FirstLevelMenu returnBtn={true} />
          <SecondLevelMenu />
        </>
      ) : (
        <SideBar />
      )}

      {selectedSubmenuItem ? <></> : null}
    </>
  );
}
export default TabletSideBar;
