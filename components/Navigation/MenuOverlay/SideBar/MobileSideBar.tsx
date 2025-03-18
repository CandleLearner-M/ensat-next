import { useNavigation } from "../../state/context";
import { SecondLevelMenu } from "../ContentArea/ContentArea";
import SideBar from "./SideBar";

function MobileSideBar() {
  const {
    state: { selectedSubmenuItem },
  } = useNavigation();

  return (
    <>
      {selectedSubmenuItem ? <SecondLevelMenu returnBtn={true} /> : <SideBar />}
    </>
  );
}
export default MobileSideBar;
