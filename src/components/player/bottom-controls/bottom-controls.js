import React, { useState } from "react";
import styles from "../player.module.css";

import backward from "../../../ui/icons/backward.svg";
import forward from "../../../ui/icons/forward.svg";
import fullscreen from "../../../ui/icons/full.svg";
import exitFullscreen from "../../../ui/icons/noFull.svg";
import ageIcon from "../../../ui/icons/age.svg";
import soundMiddle from "../../../ui/icons/sound-middle.svg";
import soundMax from "../../../ui/icons/sound-max.svg";
import soundMute from "../../../ui/icons/mute.svg";
import accessibility from "../../../ui/icons/accessibility.svg";
import subtitles from "../../../ui/icons/CC.svg";
import audio from "../../../ui/icons/AD.svg";

import ModalHint from "../../modal-hint/modal-hint";

export default function BottomControls({
  handleBackward,
  handleForward,
  colBlindActive,
  setColBlindActive,
  epilepsyActive,
  setEpilepsyActive,
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [soundIsHovered, setSoundIsHovered] = useState(false);
  const [sound, setSound] = useState(100);
  const [soundState, setSoundState] = useState("max"); //max, middle or mute
  const [openModal, setOpenModal] = useState(false);

  const handleFullScreen = () => {
    const player = document.querySelector("body");
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      /* IE11 */
      player.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const handleExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const handleSetSound = (e) => {
    const soundBar = document.querySelector(`.${styles.soundBar}`);
    if (soundBar) {
      const soundBarWidth = soundBar.offsetWidth;
      const clickedPosition = e.clientX - soundBar.getBoundingClientRect().left;
      const soundPercent = (clickedPosition / soundBarWidth) * 100;
      setSound(soundPercent);
      const video = document.querySelector("video");
      const videoSound = soundPercent / 100;
      video.volume = videoSound;
      if (soundPercent <= 50 && soundPercent > 0) {
        setSoundState("middle");
      } else if (soundPercent === 0) {
        setSoundState("mute");
      } else {
        setSoundState("max");
      }
    }
  };

  const handleMute = () => {
    const video = document.querySelector("video");
    if (soundState !== "mute") {
      setSoundState("mute");
      video.volume = 0;
      setSound(0);
    } else {
      setSoundState("middle");
      video.volume = 0.5;
      setSound(50);
    }
  };

  let soundIcon;
  if (soundState === "max") {
    soundIcon = soundMax;
  } else if (soundState === "middle") {
    soundIcon = soundMiddle;
  } else {
    soundIcon = soundMute;
  }

  return (
    <div className={styles.bottomButtons}>
      <div className={styles.left}>
        <img
          className={`${styles.svgIcon}`}
          alt=""
          src={backward}
          onClick={handleBackward}
        ></img>
        <img
          className={`${styles.svgIcon}`}
          alt=""
          src={forward}
          onClick={handleForward}
        ></img>
        <div
          className={styles.soundSettings}
          onMouseMove={() => setSoundIsHovered(true)}
          onMouseLeave={() => setSoundIsHovered(false)}
        >
          <img
            className={styles.svgIcon}
            alt=""
            src={soundIcon}
            onClick={handleMute}
          ></img>
          {soundIsHovered && (
            <div className={styles.soundBar} onClick={handleSetSound}>
              <div
                className={styles.soundBarFiller}
                style={{ width: `${sound}%` }}
              >
                <div className={styles.soundCircle}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.right}>
        {openModal && (
          <ModalHint
            colBlindActive={colBlindActive}
            setColBlindActive={setColBlindActive}
            epilepsyActive={epilepsyActive}
            setEpilepsyActive={setEpilepsyActive}
            setOpenModal={setOpenModal}
          />
        )}

        <img
          className={`${styles.svgIcon} ${styles.subtitles}`}
          alt=""
          src={audio}
        ></img>
        <img
          className={`${styles.svgIcon} ${styles.subtitles}`}
          alt=""
          src={subtitles}
        ></img>
        <img
          className={`${styles.svgIcon} ${styles.accessibility}`}
          alt=""
          src={accessibility}
          onClick={() => setOpenModal(true)}
        ></img>
        <img
          className={`${styles.svgIcon} ${styles.ageRating}`}
          alt=""
          src={ageIcon}
        ></img>
        <img
          className={`${styles.svgIcon} ${styles.fullScreen}`}
          alt=""
          src={isFullScreen ? exitFullscreen : fullscreen}
          onClick={isFullScreen ? handleExitFullScreen : handleFullScreen}
        ></img>
      </div>
    </div>
  );
}
