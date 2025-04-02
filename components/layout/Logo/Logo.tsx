import Image from "next/image";

import logo from "@/assets/logo.png";

import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.logo}>
      <Image src={logo} alt="ENSA" title="ENSA Tanger" priority height={48} />
      <div>
        <h1>ENSA</h1>
        <h2>TANGER</h2>
      </div>
    </div>
  );
}
export default Logo;
