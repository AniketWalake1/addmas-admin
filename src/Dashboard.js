import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import register_operator from "./images/register-operator.png"
import Check_Reports  from "./images/check-reports.png"
import set_target from "./images/set-target.png"
import maintenance from "./images/maintenance-record.png"
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = (page) => {
    navigate(`/${page}`); // Dynamic route based on button click
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="button-container">
        <button
          className="image-button"
          onClick={() => handleButtonClick('Operator')}
        >
          <img src={register_operator} alt="Register a Operator" />
        </button>

        <button
          className="image-button"
          onClick={() => handleButtonClick('CheckReports')}
        >
          <img src={Check_Reports} alt="Check Reports" />
        </button>

        <button
          className="image-button"
          onClick={() => handleButtonClick('Target')}
        >
          <img src={set_target} alt="Set Target" />
        </button>

        <button
          className="image-button"
          onClick={() => handleButtonClick('MaintenanceRecord')}
        >
          <img src={maintenance} alt="Maintenance Record" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
