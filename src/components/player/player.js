import React, { useState, useRef } from "react";
import styles from "./player.module.css";

import BottomControls from "./bottom-controls/bottom-controls";
import TopControls from "./top-controls/top-controls";
import MiddleControls from "./middle-controls/middle-controls";
import ProgressBar from "./progress-bar/progress-bar";

export default function Player({ handleClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHoveringControls, setisHoveringControls] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:00");
  const [colBlindActive, setColBlindActive] = useState(false);
  const [epilepsyActive, setEpilepsyActive] = useState(false);
  const [sound, setSound] = useState(100);

  const timeoutRef = useRef(null);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      handlePlayButton();
    } else if (event.keyCode === 37) {
      handleBackward();
    } else if (event.keyCode === 39) {
      handleForward();
    } else if (event.keyCode === 38) {
      handleSoundUp();
    } else if (event.keyCode === 40) {
      handleSoundDown();
    }
  };

  const handleSoundUp = () => {
    const video = document.querySelector("video");
    if (video.volume + 0.2 <= 1) {
      video.volume += 0.2;
      setSound(sound + 20);
    }
  };

  const handleSoundDown = () => {
    const video = document.querySelector("video");
    if (video.volume - 0.2 >= 0) {
      video.volume -= 0.2;
      setSound(sound - 20);
    }
  };

  const handlePlayButton = (opt) => {
    const video = document.querySelector("video");
    if (isPlaying) {
      video.pause();
      setIsPlaying(!isPlaying);
    } else {
      if (opt !== "modal") {
        video.play();
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = document.querySelector("video"); // get the video element
    const progressPercent = (video.currentTime / video.duration) * 100; // calculate progress percentage
    setProgress(progressPercent);

    if (video.ended) {
      setIsPlaying(false);
    }
    const currentTime = formatTime(video.currentTime);
    const endTime = formatTime(video.duration);
    setCurrentTime(currentTime);
    setEndTime(endTime);
  };

  const handleForward = () => {
    const video = document.querySelector("video");
    video.currentTime += 10;
  };

  const handleBackward = () => {
    const video = document.querySelector("video");
    video.currentTime -= 10;
  };

  const handleMouseLeave = () => {
    setisHoveringControls(false);
    clearTimeout(timeoutRef.current);
  };

  const handleMouseMove = () => {
    setisHoveringControls(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setisHoveringControls(false);
    }, 5000);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.player}>
      <video
        className={styles.video}
        onTimeUpdate={handleTimeUpdate}
        controlsList="nodownload nofullscreen"
      >
        <source
          src={`${process.env.PUBLIC_URL}/samples/sample3.mp4`}
          type="video/mp4"
        />
      </video>
      <div
        className={styles.controls}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ opacity: isHoveringControls ? 1 : 0 }}
      >
        <TopControls />
        <MiddleControls playVideo={handlePlayButton} isPlaying={isPlaying} />

        <div className={styles.bottomControls}>
          <ProgressBar
            formatTime={formatTime}
            progress={progress}
            currentTime={currentTime}
            endTime={endTime}
          />
          <BottomControls
            handleForward={handleForward}
            handleBackward={handleBackward}
            colBlindActive={colBlindActive}
            setColBlindActive={setColBlindActive}
            epilepsyActive={epilepsyActive}
            setEpilepsyActive={setEpilepsyActive}
            sound={sound}
            setSound={setSound}
            handlePlayButton={handlePlayButton}
          />
        </div>
      </div>
    </div>
  );
}
