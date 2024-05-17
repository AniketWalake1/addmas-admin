import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Ensure you have Firestore initialized in this file
import { collection, getDocs } from 'firebase/firestore';
import './JobsCompletedList.css'; // Optional: Create a CSS file for styling

const JobsCompletedList = () => {
  const [jobsCompleted, setJobsCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsCompleted = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'JobCompleted'));
        const jobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJobsCompleted(jobs);
      } catch (err) {
        setError('Failed to fetch jobs completed. Please try again.');
        console.error('Error fetching documents: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsCompleted();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="jobs-completed-list-container">
      <h2>Jobs Completed</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Jobs Completed</th>
            <th>Operator Name</th>
            <th>Shift</th>
          </tr>
        </thead>
        <tbody>
          {jobsCompleted.map((job) => (
            <tr key={job.id}>
              <td>{job.date}</td>
              <td>{job.jobsCompleted}</td>
              <td>{job.operatorName}</td>
              <td>{job.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsCompletedList;
