import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Replace with your Firebase config
import { useNavigate } from 'react-router-dom';

const SelectJob = ({ onJobSelected }) => {
  const [jobList, setJobList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsFromFirestore = async () => {
      try {
        const jobsCollection = await getDocs(collection(db, 'JobDetails'));
        const jobs = jobsCollection.docs.map((doc) => ({
          id: doc.id,
          jobName: doc.data().jobName,
        }));
        setJobList(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobsFromFirestore();
  }, []);

  const addJob = () => {
    navigate('/add-job');
    console.log('Add job button clicked');
  };

  return (
    <div>
      <h2>Job List</h2>
      <ul>
        {jobList.map((job) => (
          <li key={job.id}>
            {job.jobName}
          </li>
        ))}
      </ul>
      <button onClick={addJob}>Add Job</button>
    </div>
  );
};

export default SelectJob;
