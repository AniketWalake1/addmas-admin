// App.js
import React from 'react';
import RegisterOperator from './RegisterOperator';
import UserList from './UserList';
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
    </div>
  );
}

export default App;
