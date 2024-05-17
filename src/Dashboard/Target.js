import React from 'react';
import TargetForm from './SetTarget';
import JobsCompletedList from './JobsCompletedList';
import './Target.css'; // Optional: Create a CSS file for global styles

const Target = () => {
  return (
    <div className="app-container">
      <h1>Production Dashboard</h1>
      <TargetForm />
      <JobsCompletedList />
    </div>
  );
};

export default Target;
