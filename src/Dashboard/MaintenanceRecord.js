import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import "./MaintenanceRecord.css"

function MaintenanceRecord() {
  const [breakdownRecords, setBreakdownRecords] = useState([]);

  useEffect(() => {
    const fetchBreakdownRecords = async () => {
      try {
        const breakdownRef = collection(db, 'breakdown');
        const snapshot = await getDocs(breakdownRef);
        const records = [];
        snapshot.forEach((doc) => {
          records.push(doc.data());
        });
        setBreakdownRecords(records);
      } catch (error) {
        console.error('Error fetching breakdown records:', error);
      }
    };

    fetchBreakdownRecords();
  }, []);

  return (
    <div>
      <h2>Maintenance Record</h2>
      <table>
        <thead>
          <tr>
            <th>Breakdown ID</th>
            <th>Cause of Breakdown</th>
            <th>Spares</th>
            <th>Time</th>
            <th>User ID</th>
            <th>Total Breakdown Time</th>
            <th>Date</th>
            <th>Nature of Problem</th>
          </tr>
        </thead>
        <tbody>
          {breakdownRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.Breakdown_ID}</td>
              <td>{record.cause_of_bd}</td>
              <td>{record.spares}</td>
              <td>{record.timetext}</td>
              <td>{record.User_ID}</td>
              <td>{record.TotalHrOfBreakdown}</td>
              <td>{record.Date}</td>
              <td>{record.nature_of_problem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaintenanceRecord;