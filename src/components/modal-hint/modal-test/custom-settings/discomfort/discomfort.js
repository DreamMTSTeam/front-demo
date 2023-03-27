import React, { useState } from "react";
import styles from "../../../modal-hint.module.css";

export default function Discomfort({
  switchSection,
  chooseDiscomforts,
  customSettings,
}) {
  const discomforts = [
    "Эффекты мерцания",
    "Резкая смена кадров",
    "Калейдоскопическая съёмка",
    "Высокая контрастность",
    "Мелькание света на экране",
    "Яркие вспышки",
    "Полосы, спирали и концентрические круги занимают большую часть экрана",
  ];

  const [chosenDiscomforts, setChosenDiscomforts] = useState([]);

  const handleSubmit = (e) => {
    chooseDiscomforts({
        ...customSettings,
        discomforts: chosenDiscomforts,
    })
    setTimeout(()=>{
        switchSection();
    }, 100);
  };

  const handleDiscomfortsClick = (e) => {
    const list = chosenDiscomforts;
    if (e.target.classList.contains(styles.clicked)) {
      e.target.classList.remove(styles.clicked);
      if (~list.indexOf(e.target.innerText)) {
        list.splice(list.indexOf(e.target.innerText), 1);
      }
    } else {
      e.target.classList.add(styles.clicked);
      list.push(e.target.innerText);
    }
    setChosenDiscomforts([...list]);
    console.log(chosenDiscomforts);
  };

  return (
    <div className={styles.discomfortSection}>
      <div className={styles.discomfortList}>
        {discomforts.map((el, key) => (
          <button
            className={`${styles.discomfortButton}`}
            key={key}
            onClick={(e) => handleDiscomfortsClick(e)}
          >
            {el}
          </button>
        ))}
      </div>
      <div className={styles.discomfButtons}>
        <button
          className={`${styles.nextButton} ${styles.testButton}`}
          onClick={switchSection}
        >
          Ничего не мешает
        </button>
        <button className={styles.submitDefault} onClick={handleSubmit}>Продолжить</button>
      </div>
    </div>
  );
}
