import Image from "next/image";
import { useNavigation } from "../../state/context";
import styles from "./Background.module.scss";

function Background({ src }: { src: string }) {
  const {
    state: { selectedMenuItem },
  } = useNavigation();
  return (
    <div className={styles.background}>
      <Image
        src={src}
        alt={selectedMenuItem ?? ""}
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "50% 0%",
        }}
      />
      <div className={styles.background__overlay}></div>
    </div>
  );
}
export default Background;
