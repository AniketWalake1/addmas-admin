// UserList.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const userSnapshot = await getDocs(usersRef);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div className="container2">
      <h2>Registered Users</h2>
      <button onClick={handleRefresh} className="btn btn-primary">
        Refresh User List
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            // Check if the user has a name before rendering
            user.name ? (
              <tr key={user.id}>
                <td className="name">{user.name}</td>
                <td className="email">{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;