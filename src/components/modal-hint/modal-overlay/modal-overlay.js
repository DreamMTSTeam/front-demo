import React from 'react';
import styles from '../modal-hint.module.css';

export default function ModalOverlay({handleClose}) {
  return (
    <div
      className={styles.modal_overlay}
      onClick={handleClose}
      id="modal-overlay"
    ></div>
  )
}
