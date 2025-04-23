"use client";

import { useState, useEffect } from "react";
import styles from "./UserTimeInfo.module.scss";

export default function UserTimeInfo() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [username] = useState("CandleLearner-M");

  useEffect(() => {
    // Update time on component mount
    updateDateTime();

    // Set up interval to update every second
    const interval = setInterval(updateDateTime, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const updateDateTime = () => {
    const now = new Date();

    // Format to YYYY-MM-DD HH:MM:SS in UTC
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    setCurrentDateTime(formatted);
  };

  return (
    <div className={styles.userTimeContainer}>
      <div className={styles.infoItem}>
        <span className={styles.label}>Current Date and Time (UTC):</span>
        <span className={styles.value}>{currentDateTime}</span>
      </div>

      <div className={styles.infoItem}>
        <span className={styles.label}>Current User's Login:</span>
        <span className={styles.value}>{username}</span>
      </div>
    </div>
  );
}
