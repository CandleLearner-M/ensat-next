import { Link } from "@/i18n/navigation";
import styles from "./AnimatedLink.module.scss";
import React from "react";

function AnimatedLink({
  children,
  href,
  className = "",
  underlineColor,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  underlineColor?: string;
}) {
  const linkStyle = underlineColor
    ? ({ "--underline-color": underlineColor } as React.CSSProperties)
    : {};

  return (
    <Link
      href={href}
      className={`${className} ${styles.link}`}
      style={linkStyle}
    >
      {children}
    </Link>
  );
}

export default AnimatedLink;
