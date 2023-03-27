import React, { useState } from "react";
import styles from "../../../modal-hint.module.css";

export default function FontSettings({
  switchSection,
  chooseFont,
  customSettings,
}) {
  const [active, setActive] = useState([true, true, true, true]);
  const [chosen, setChosen] = useState(2);

  const fontSizes = ["38", "24", "16", "11"];

  const options = [
    "Надеюсь вы меня видите",
    "Если читаете меня - это хорошо",
    "А если это разглядели - просто чудесно",
    "Да вы зорки, найдете любой текст",
  ];
  const styleList = [
    styles.firstLevelText,
    styles.secondLevelText,
    styles.thirdLevelText,
    styles.fourthLevelText,
  ];

  const submitSection = () => {
    chooseFont({
        ...customSettings,
        fontSize: fontSizes[chosen],
    })
    switchSection();
  };

  const handleOptClick = (e) => {
    const activeList = active;
    for (let i = 0; i < activeList.length; i++) {
      if (i !== parseInt(e.target.id)) {
        activeList[i] = false;
      } else {
        activeList[i] = true;
        setChosen(i);
      }
    }
    setActive([...activeList]);
  };

  return (
    <div className={styles.fontSettings}>
      {options.map((el, key) => {
        return (
          <span
            className={styleList[key]}
            id={key}
            key={key}
            style={active[key] ? { opacity: "1" } : { opacity: "0.5" }}
            onClick={(e) => handleOptClick(e)}
          >
            {el}
          </span>
        );
      })}
      <button
        className={`${styles.nextButton} ${styles.testButton}`}
        onClick={submitSection}
      >
        Продолжить
      </button>
    </div>
  );
}
