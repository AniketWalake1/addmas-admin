// App.js
import React from 'react';
import RegisterOperator from './RegisterOperator';
import UserList from './UserList';
import SelectJob from './SelectJob';
import './Operator.css';

function App() {
  return (
    <div className="app-container">
      <div className="left-column">
        <RegisterOperator />
      </div>
      <div className="right-column">
        <UserList />
      </div>
      <div className="right-column">
        <SelectJob />
      </div>
    </div>
  );
}

export default App;
