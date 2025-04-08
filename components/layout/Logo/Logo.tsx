import Image from "next/image";

import logo from "@/assets/logo.png";

import styles from "./Logo.module.scss";

function Logo({ color = "white" }: { color?: "black" | "white" }) {
  const colors = {
    color: color === "black" ? "#000" : "#fff",
    transition: "color 0.3s ease-in-out",
  };
  return (
    <div className={styles.logo}>
      <Image src={logo} alt="ENSA" title="ENSA Tanger" priority height={48} />
      <div>
        <h1 style={colors}>ENSA</h1>
        <h2 style={colors}>TANGER</h2>
      </div>
    </div>
  );
}
export default Logo;
