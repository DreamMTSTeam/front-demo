import React from "react";
import styles from "../player.module.css";

import closeIcon from "../../../ui/icons/close.svg";

export default function TopControls() {
  const handleCloseButton = () => {};
  return (
    <div className={styles.topControls}>
      <div className={styles.videoTitle}>Title</div>

      <img
        className={`${styles.svgIcon}`}
        alt=""
        src={closeIcon}
        onClick={handleCloseButton}
      ></img>
    </div>
  );
}
