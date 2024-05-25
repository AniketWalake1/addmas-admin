import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import RegisterOperator from './Dashboard/RegisterOperator'
import MaintenanceRecord from './Dashboard/MaintenanceRecord.js'
import SetTarget from './Dashboard/SetTarget.js'
import CheckReports from './Dashboard/CheckReports.js'
import Operator from './Dashboard/Operator.js'
import Target from './Dashboard/Target.js'
import SelectJob from './Dashboard/SelectJob.js';
import AddJob from './Dashboard/AddJob.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/RegisterOperator" element={<RegisterOperator />} />
        <Route path="/MaintenanceRecord" element={<MaintenanceRecord />} />
        <Route path="/SetTarget" element={<SetTarget />} />
        <Route path="/CheckReports" element={<CheckReports />} />
        <Route path="/Operator" element={<Operator />} />
        <Route path="/Target" element={<Target />} />
        <Route path="/SelectJob" element={<SelectJob/>}/>
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
      <Outlet />  {/* This is where matched route content will be rendered */}
    </Router>
  );
}

export default App;
