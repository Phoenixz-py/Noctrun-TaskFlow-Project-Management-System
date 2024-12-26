import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        setUserRole(payload.role); // Use the 'role' field from the payload
      } catch (err) {
        console.error('Error decoding token:', err);
        setUserRole(null); // Handle invalid token
      }
    }
  }, []);
  

  return (
    <div>
      <h2>Dashboard</h2>

      {userRole === 'ADMIN' && (
        <div>
          <h3>Welcome, Admin!</h3>
          <p>Here you can manage the entire system, users, and projects.</p>
          {/* Add Admin-specific features here */}
        </div>
      )}

      {userRole === 'TEAM_LEAD' && (
        <div>
          <h3>Welcome, Team Lead!</h3>
          <p>You can manage tasks and assign them to team members.</p>
          {/* Add Team Lead-specific features here */}
        </div>
      )}

      {userRole === 'USER' && (
        <div>
          <h3>Welcome, Staff Member!</h3>
          <p>You can view and work on tasks assigned to you.</p>
          {/* Add Staff-specific features here */}
        </div>
      )}

      {!userRole && (
        <div>
          <p>Loading user role...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
