import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./modal-hint.module.css";
import playerStyles from "../player/player.module.css";

import ModalOverlay from "./modal-overlay/modal-overlay";
import colBlindness from "../../ui/icons/colourblindness-on.svg";
import epilepsy from "../../ui/icons/epilepsy-on.svg";
import savedSettings from "../../ui/icons/saved-preset.svg";
import presetSettings from "../../ui/icons/preset-settings.svg";

const modalRoot = document.getElementById("react-modals");

export default function ModalHint({
  setOpenModal,
  colBlindActive,
  setColBlindActive,
  epilepsyActive,
  setEpilepsyActive,
}) {
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const closeOnEscape = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const progressBarStyle = document.querySelector(
    `.${playerStyles.middleControls}`
  );
  const windowHeight = window.innerHeight;
  const bottomPos =
    windowHeight - progressBarStyle.getBoundingClientRect().bottom;

  return createPortal(
    <>
      <ModalOverlay handleClose={handleClose} />
      <div className={styles.modalHint} style={{ bottom: bottomPos + "px" }}>
        <ul className={styles.list}>
          <li
            className={`${styles.point} ${
              colBlindActive ? styles.active : styles.inactive
            }`}
            onClick={() => setColBlindActive(!colBlindActive)}
          >
            <img
              className={`${styles.svgIcon} ${styles.colBlindness}`}
              alt=""
              src={colBlindness}
            ></img>
            <span>Цветовая слепота</span>
          </li>
          <li
            className={`${styles.point} ${
              epilepsyActive ? styles.active : styles.inactive
            }`}
            onClick={() => setEpilepsyActive(!epilepsyActive)}
          >
            <img
              className={`${styles.svgIcon} ${styles.epileplsy}`}
              alt=""
              src={epilepsy}
            ></img>
            <span>Фотосенситивность</span>
          </li>
          <li className={styles.point}>
            <img
              className={`${styles.svgIcon} ${styles.subtitles}`}
              alt=""
              src={savedSettings}
            ></img>
            <span>Сохраненные настройки</span>
          </li>
          <li className={styles.point}>
            <img
              className={`${styles.svgIcon} ${styles.subtitles}`}
              alt=""
              src={presetSettings}
            ></img>
            <span>Больше настроек</span>
          </li>
        </ul>
      </div>
    </>,
    modalRoot
  );
}
