import React, { useState } from 'react';
import styles from './AddPeople.module.css'; // Create this CSS file for styling
import axios from 'axios';
import { toast } from 'react-toastify';

const Okay =  ({ closeModal, addedEmail }) => {
    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>{addedEmail} added to the board</p>
          <button onClick={closeModal} className={styles.okayBtn}>Okay, got it!</button>
        </div>
      </div>
    )
}

export default Okay;


