import React from "react";
import styles from "../player.module.css";

import play from "../../../ui/icons/play.svg";
import pause from "../../../ui/icons/pause.svg";

export default function MiddleControls({playVideo, isPlaying}) {
  return (
    <div className={styles.middleControls} onClick={playVideo}>
      <img
        className={`${styles.svgIcon} ${styles.playButton}`}
        alt=""
        src={isPlaying ? pause : play}
        onClick={playVideo}
      ></img>
    </div>
  );
}
