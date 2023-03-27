import React, { useState } from "react";
import styles from "../../modal-hint.module.css";

import closeIcon from "../../../../ui/testIcons/closeIcon.png";

export default function DefaultSettings({
  setToCustom,
  handleClose,
  addDisability,
  chosenDisabilities,
}) {

  const disabilities = [
    "Эпилепсия",
    "Дальтонизм",
    "Эффекты вспышек и мерцания",
    "Нужен голосовой помощник",
    "Проблемы со слухом",
  ];

  const chosenDisability = (e) => {
    const list = chosenDisabilities;
    if (e.target.classList.contains(styles.clicked)) {
      e.target.classList.remove(styles.clicked);
      if(~list.indexOf(e.target.innerText)) {
        list.splice(list.indexOf(e.target.innerText), 1);
        addDisability([...list])
      }
    } else {
      e.target.classList.add(styles.clicked);
      if(!~list.indexOf(e.target.innerText)) {
        addDisability([...list, e.target.innerText])
      }
    }
  };

  const handleCustomButton = () => {
    setToCustom(true);
  };
  return (
    <>
      <section className={styles.modalTestHeader}>
        <span></span>
        <span className={styles.modalTestTitle}>
          Настройки особых потребностей
        </span>
        <img
          className={styles.testIcon}
          alt=""
          src={closeIcon}
          onClick={handleClose}
        />
      </section>
      <section className={styles.modalTestContent}>
        <span className={styles.modalTestText}>
          Настройте плеер так, чтобы вам было удобно
        </span>
        <div className={styles.disabilitiesList}>
          {disabilities.map((el, key) => (
            <button
              className={`${styles.disabilityButton} ${styles.testButton}`}
              key={key}
              onClick={(e) => chosenDisability(e)}
            >
              {el}
            </button>
          ))}
        </div>
        {chosenDisabilities.length ? <button className={styles.submitDefault}>Сохранить</button> : ""}
        <span className={styles.modalTestText}>
          Или настройте плеер под особые потребности самостоятельно
        </span>
        <button
          className={`${styles.goToCustom} ${styles.testButton}`}
          onClick={handleCustomButton}
        >
          Настроить самостоятельно
        </button>
      </section>
    </>
  );
}
