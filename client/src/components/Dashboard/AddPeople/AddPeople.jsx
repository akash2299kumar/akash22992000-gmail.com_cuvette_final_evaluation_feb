import React, { useState } from 'react';
import styles from './AddPeople.module.css'; // Create this CSS file for styling
import axios from 'axios';
import { toast } from 'react-toastify';
import Okay from './Okay';

const AddPeople = ({ onCancel, onAddPeople }) => {
  const [email, setEmail] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      await axios.post('http://localhost:5001/api/board/add-people', { email });
      
      console.log('Email added');
      onAddPeople(email); 
      setEmail(''); 
      toast.success('Person added to the board successfully');
    } catch (error) {
      toast.error('Error adding person. Please try again later.');
    }
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.addPeopleModal}>
        <h2>Add people to the board</h2>
        <div >
          <form>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter the email"
            required
          />
          </form>
          <div className={styles.btn}>
            <div className={styles.actions1}>
              <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            </div>
            <div className={styles.actions2}>
              <button type="submit" onClick={handleSubmit} className={styles.addBtn}>Add Email</button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default AddPeople;
