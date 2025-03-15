import navigationData from "../../state/ENSATNavDS";

import styles from "./SideBar.module.scss";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        {navigationData.map((title) => (
          <li key={title.id}>{title.label}</li>
        ))}
      </ul>
    </div>
  );
}
export default SideBar;
