import React, { useState } from 'react';
import { db } from '../firebase'; // Assuming you have your Firestore instance imported as 'db'
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TargetForm.css'; // Import your CSS file for styling

const TargetForm = () => {
  const [date, setDate] = useState(null);
  const [shift, setShift] = useState('');
  const [targetValue, setTargetValue] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const targetData = {
      date: date.toISOString().split('T')[0],
      shift,
      targetValue,
    };

    try {
      // Add the target data to the 'targets' collection in Firestore
      await addDoc(collection(db, 'targets'), targetData);
      // Reset form fields
      setDate(null);
      setShift('');
      setTargetValue(0);
      // Set success message
      setMessage('Target set successfully!');
    } catch (error) {
      console.error('Error writing document: ', error);
      // Set error message
      setMessage('Failed to set target. Please try again.');
    }
  };

  return (
    <div className="target-form-container">
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
        />
        <select
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          placeholder="Select shift"
        >
          <option value="">Select shift</option>
          <option value="1st Shift">1st Shift</option>
          <option value="2nd Shift">2nd Shift</option>
          <option value="3rd Shift">3rd Shift</option>
        </select>
        <input
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(Number(e.target.value))}
          placeholder="Enter target value"
        />
        <button type="submit">Save Target</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default TargetForm;
