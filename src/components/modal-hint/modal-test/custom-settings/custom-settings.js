import React, { useState } from "react";
import styles from "../../modal-hint.module.css";

import backIcon from "../../../../ui/testIcons/backIcon.png";
import closeIcon from "../../../../ui/testIcons/closeIcon.png";
import FontSettings from "./font-settings/font-settings";
import ColorSettings from "./color-settings/color-settings";
import Discomfort from "./discomfort/discomfort";
import TestResult from "./test-result/test-result";

export default function CustomSettings({
  backToDefault,
  handleClose,
  customSettings,
  setCustomSettings,
}) {
  const [currentSection, setCurrentSection] = useState(1);

  const sectionTitles = [
    "Выберите размер текста",
    "Настройки цветовой палитры",
    "Что мешает вам смотреть фильмы?",
    "Итог настройки"
  ];

  const handleBackToDefault = () => {
    backToDefault(false);
  };

  const switchSection = () => {
    if (currentSection !== 4) {
      setCurrentSection(currentSection + 1);
    }
  };

  const backSection = () => {
    if (currentSection !== 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <>
      <section className={styles.modalTestHeader}>
        <img
          className={styles.testIcon}
          alt=""
          src={backIcon}
          onClick={currentSection === 1 ? handleBackToDefault : backSection}
        />
        <span className={styles.modalTestTitle}>
          {sectionTitles[currentSection - 1]}
        </span>
        <img
          className={styles.testIcon}
          alt=""
          src={closeIcon}
          onClick={handleClose}
        />
      </section>
      <section className={styles.modalTestContent}>
        {currentSection === 1 && (
          <FontSettings
            switchSection={switchSection}
            chooseFont={setCustomSettings}
            customSettings={customSettings}
          />
        )}
        {currentSection === 2 && (
          <ColorSettings
            switchSection={switchSection}
            choosePalette={setCustomSettings}
            customSettings={customSettings}
          />
        )}
        {currentSection === 3 && (
          <Discomfort
            switchSection={switchSection}
            chooseDiscomforts={setCustomSettings}
            customSettings={customSettings}
          />
        )}
        {currentSection === 4 && (
            <TestResult
                customSettings={customSettings}
            />
        )}
      </section>
      <section className={styles.modalTestFooter}>
        {[1, 2, 3, 4].map((el, key) => (
          <div
            className={`${styles.sectionDot} ${
              currentSection === el ? styles.activeDot : ""
            }`}
            key={key}
          ></div>
        ))}
      </section>
    </>
  );
}
