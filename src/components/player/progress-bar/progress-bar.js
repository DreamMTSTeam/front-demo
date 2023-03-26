import React, { useState } from "react";
import styles from "../player.module.css";

export default function ProgressBar({formatTime, progress, currentTime, endTime}) {
  const [timing, setTiming] = useState(0);
  const [progressBarHover, setProgressBarHover] = useState(false);

  const handleProgressBarHover = (event) => {
    const progressBar = event.target;
    const boundingRect = progressBar.getBoundingClientRect();
    const mouseX = event.clientX - boundingRect.left;
    const progressPercent = (mouseX / boundingRect.width) * 100;
    const video = document.querySelector("video");
    const timing = (progressPercent * video.duration) / 100;
    setTiming(Math.floor(timing));

    if (document.querySelector(`.${styles.progressBarTiming}`)) {
      const timingDiv = document.querySelector(`.${styles.progressBarTiming}`);
      timingDiv.style.left = event.clientX - 38 + "px";
      timingDiv.style.top = boundingRect.top - 35 + "px";
    }
    setProgressBarHover(true);
  };

  const handleProgressBarLeave = () => {
    setProgressBarHover(false);
  };

  const handleSetTiming = (e) => {
    const progressBar = document.querySelector(`.${styles.progressBar}`);
    if (progressBar) {
      const progressBarWidth = progressBar.offsetWidth;
      const clickedPosition =
        e.clientX - progressBar.getBoundingClientRect().left;
      const timePercent = (clickedPosition / progressBarWidth) * 100;
      const video = document.querySelector("video");
      const videoTime = (timePercent / 100) * video.duration;
      video.currentTime = videoTime;
    }
  };
  return (
    <div className={styles.progressBarContainer}>
      {progressBarHover && (
        <div className={styles.progressBarTiming}>{formatTime(timing)}</div>
      )}
      <div
        className={styles.progressBar}
        onClick={handleSetTiming}
        onMouseMove={handleProgressBarHover}
        onMouseLeave={handleProgressBarLeave}
      >
        <div
          className={styles.progressFiller}
          style={{ width: `${progress}%` }} // update the width of the progressFiller element
        ></div>
      </div>
      <div className={styles.totalTimeContainer}>
        <div className={styles.currentTime}>{currentTime}</div>
        <div className={styles.totalTime}>/{endTime}</div>
      </div>
    </div>
  );
}
