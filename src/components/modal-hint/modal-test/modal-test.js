import React, { useState } from "react";
import styles from "../modal-hint.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

import DefaultSettings from "./default-settings/default-settings";
import CustomSettings from "./custom-settings/custom-settings";

export default function ModalTest({ setOpenModalTest }) {
  const [isCustomSettings, setIsCustomSettings] = useState(false);
  const [chosenDefault, setChosenDefault] = useState([]);

  const [customSettings, setCustomSettings] = useState({
    fontSize: "",
    colorPalette: "",
    discomforts: []
  })

  const handleClose = () => {
    setOpenModalTest(false);
  };

  return (
    <>
      <ModalOverlay handleClose={handleClose} />
      <main className={styles.modalTestWindow}>
        {isCustomSettings ? (
          <CustomSettings
            backToDefault={setIsCustomSettings}
            handleClose={handleClose}
            customSettings={customSettings}
            setCustomSettings={setCustomSettings}
          />
        ) : (
          <DefaultSettings
            setToCustom={setIsCustomSettings}
            handleClose={handleClose}
            addDisability={setChosenDefault}
            chosenDisabilities={chosenDefault}
          />
        )}
      </main>
    </>
  );
}
