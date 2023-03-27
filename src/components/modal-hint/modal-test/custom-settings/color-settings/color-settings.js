import React from "react";
import styles from "../../../modal-hint.module.css";

import colorSet from "../../../../../ui/testIcons/colorSet.png";

export default function ColorSettings({ switchSection, choosePalette, customSettings }) {
  const options = [
    "Обычный",
    "Протанопия (красно-зеленый)",
    "Дейтранопия (красно-зеленый)",
    "Тританопия (сине-фиолетовый)",
    "Оттенки серого",
  ];

  const chooseColorOption = (e) => {
    choosePalette({
        ...customSettings,
        colorPalette: options[e.target.id],
    })
    setTimeout(() => {
      switchSection();
    }, 100);
  };
  

  return (
    <div className={styles.colorSettings}>
      <img alt="" src={colorSet} />
      <div className={styles.colorOption}>
        {options.map((el, key) => (
          <button
            className={`${styles.colorOptButton} ${
              el === "Обычный" ? styles.defaultColorOpt : ""
            }`}
            key={key}
            onClick={(e)=>chooseColorOption(e)}
            id={key}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
}
