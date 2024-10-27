import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import styles from './MyDatePicker.module.css'; // Import CSS module for custom styling

const MyDatePicker = () => {
  const [startDate, setStartDate] = useState(null); 
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date) => {
    setIsOpen(!isOpen);
    setStartDate(date);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`${styles.exampleCustomInput}${startDate ? ` ${styles.selected}` : ''}`} 
        onClick={handleClick}
      >
        {startDate ? format(startDate, "dd-MM-yyyy") : 'Select a date'} 
      </button>
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          inline
          placeholderText="Select a date" 
        />
      )}
    </>
  );
};

export default MyDatePicker;
