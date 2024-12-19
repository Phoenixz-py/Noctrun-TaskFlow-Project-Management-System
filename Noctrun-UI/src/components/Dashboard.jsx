import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for token and extract the role (this assumes you stored the role in the token or fetched it from an API)
    const token = localStorage.getItem('token');
    if (token) {
      // If the token is present, extract role from it (you might need a real decoding mechanism here)
      // For now, assuming role is stored directly in the token payload
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Simple JWT decoding (no verification)
      setUserRole(decodedToken.role);
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {userRole === 'admin' && (
        <div>
          <h3>Welcome, Admin!</h3>
          <p>Here you can manage the entire system, users, and projects.</p>
          {/* Add Admin-specific features here */}
        </div>
      )}

      {userRole === 'team-lead' && (
        <div>
          <h3>Welcome, Team Lead!</h3>
          <p>You can manage tasks and assign them to team members.</p>
          {/* Add Team Lead-specific features here */}
        </div>
      )}

      {userRole === 'staff' && (
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
