import React from "react";
import styles from "../../../modal-hint.module.css";

export default function TestResult({ customSettings, handleClose }) {
  const submitClick = () => {
    handleClose();
  };
  return (
    <div className={styles.resultDiv}>
      <span className={styles.fontResult}>
        Вы выбрали {customSettings.fontSize} размер текста
      </span>
      <span className={styles.fontResult}>
        Особенности палитры - {customSettings.colorPalette}
      </span>
      <span className={styles.fontResult}>
        Мы уберем из фильмов следующие элементы:
      </span>
      <div className={styles.discomfortResult}>
        {customSettings.discomforts.map((el, key) => (
          <button className={styles.discomfortButton} key={key} disabled>
            {el}
          </button>
        ))}
      </div>
      <button className={styles.submitDefault} onClick={submitClick}>
        Сохранить
      </button>
    </div>
  );
}
