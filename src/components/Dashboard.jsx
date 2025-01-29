import React, { useState } from "react";
import "./Dashboard.css";

// Dummy data for the statistics
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "1990-05-15",
    editedDate: "2025-01-29", // Example edited date
    deleted: false, // Flag for deleted user
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    dob: "1985-09-20",
    editedDate: "2025-01-28",
    deleted: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    dob: "1992-11-10",
    editedDate: "2025-01-29", // Example edited date
    deleted: true,
  },
];

const Dashboard = () => {
  // Get total number of users, edited today, and deleted
  const totalUsers = users.length;
  const editedToday = users.filter(
    (user) => new Date(user.editedDate).toLocaleDateString() === new Date().toLocaleDateString()
  ).length;
  const deletedUsers = users.filter((user) => user.deleted).length;

  return (
    <main className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>Select an option from the sidebar.</p>

      <div className="stats-container">
        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div className="card">
          <h3>Edited Today</h3>
          <p>{editedToday}</p>
        </div>

        <div className="card">
          <h3>Deleted Users</h3>
          <p>{deletedUsers}</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
