import React, { useState } from 'react';
import { db } from '../firebase'; // Ensure you have your Firebase configuration here
import { collection, addDoc } from 'firebase/firestore';

const AddJob = () => {
  const [jobName, setJobName] = useState('');
  const [values, setValues] = useState(Array(27).fill(''));

  const handleValueChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (jobName.trim() === '') {
      alert('Please fill in the job name');
      return;
    }

    if (values.some(value => value.trim() === '')) {
      alert('Please fill in all fields');
      return;
    }

    const jobData = { jobName };
    values.forEach((value, index) => {
      jobData[`value${index + 1}`] = value;
    });

    try {
      await addDoc(collection(db, 'JobDetails'), jobData);
      alert('Job added successfully');
      setJobName('');
      setValues(Array(27).fill(''));
    } catch (error) {
      alert('Error adding job: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Job Name:
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
            />
          </label>
        </div>
        {values.map((value, index) => (
          <div key={index}>
            <label>
              Value {index + 1}:
              <input
                type="text"
                value={value}
                onChange={(e) => handleValueChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button type="submit">Save Job</button>
      </form>
    </div>
  );
};

export default AddJob;
