import navigationData from "../../state/ENSATNavDS";

import styles from "./SideBar.module.scss";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        {navigationData.map((title) => (
          <li key={title.id}>
            <h3>{title.label}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SideBar;
