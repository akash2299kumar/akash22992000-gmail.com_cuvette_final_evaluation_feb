import React from "react";

import styles from "./LogOutPop.module.css";
function DeletePop({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 style={{ position: 'static' }}>
          <span>Are you sure you want to Logout?</span>
        </h1>
        <div className={styles.button1} onClick={onConfirm}>
          <button className={styles.yesBtn} >
            Yes, Logout
          </button>
        </div>
        <div className={styles.button2} onClick={onCancel}>
          <button className={styles.cancel} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePop;
