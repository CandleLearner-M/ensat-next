import { useNavigation } from "../../state/context";
import navigationData from "../../state/ENSATNavDS";
import styles from "./SideBar.module.scss";

function SideBar() {
  const {
    state: { selectedMenuItem },
    dispatch,
  } = useNavigation();

  return (
    <div className={styles.sidebar}>
      <ul>
        {navigationData.map((item) => {
          const isSelected = selectedMenuItem === item.id;

          return (
            <li
              key={item.id}
              className={
                selectedMenuItem && !isSelected ? styles.sidebar__grayedout : ""
              }
            >
              <h3
                onClick={() =>
                  dispatch({
                    type: "SELECT_MENU_ITEM",
                    payload: !isSelected ? item.id : null,
                  })
                }
                className={isSelected ? styles.sidebar__selected : ""}
              >
                {item.label}
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
