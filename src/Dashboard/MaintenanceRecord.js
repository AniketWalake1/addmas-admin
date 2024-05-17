import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the Firestore instance
import moment from 'moment'; // Import moment.js for date manipulation
import { collection, getDocs, query, where } from 'firebase/firestore';
import "./MaintenanceRecord.css"

function MaintenanceRecord() {
  const [breakdownRecords, setBreakdownRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term (date)

  useEffect(() => {
    const fetchBreakdownRecords = async () => {
      try {
        // Build query based on search term presence
        const q = searchTerm
          ? query(
            collection(db, 'breakdown'),
            where('Date', '>=', moment(searchTerm, 'DD/MM/YYYY').format()) // Format and filter by date
          )
          : collection(db, 'breakdown'); // Default: fetch all records

        const snapshot = await getDocs(q);
        const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBreakdownRecords(records);
      } catch (error) {
        console.error('Error fetching breakdown records:', error);
      }
    };

    fetchBreakdownRecords();
  }, [searchTerm]); // Re-fetch on searchTerm change

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="maintenance-record-container">
      <h2>Maintenance Record</h2>

      <input type="date" value={searchTerm} onChange={handleSearchChange} /> {/* Search input for date */}

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
