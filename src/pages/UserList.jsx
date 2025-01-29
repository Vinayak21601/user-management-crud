import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css";
import { apiUrl } from "../api/urls";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  // Function to format the date in "6 Jan 1990" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Open the modal for editing user
  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  // Handle form submission to update user
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation for required fields
    if (!currentUser.name || !currentUser.email || !currentUser.dob) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Construct the URL with the user ID from the URL path
      const url = `${apiUrl}?id=${currentUser.id}`;
      
      // Send the PUT request with the updated user data (excluding the ID)
      const response = await axios.put(url, {
        name: currentUser.name,
        email: currentUser.email,
        dob: currentUser.dob,
        password: currentUser.password,  // Only include the password if you're updating it
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        // Update the users list after a successful update
        setUsers(
          users.map((user) => (user.id === currentUser.id ? currentUser : user))
        );
        setSuccess("User updated successfully!");
        closeModal();
      }
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  // Handle the delete action
  const handleDelete = async (userId) => {
    try {
      // Construct the URL for the DELETE request
      const url = `${apiUrl}?id=${userId}`;
      
      // Send the DELETE request
      const response = await axios.delete(url);

      if (response.status === 200) {
        // Remove the deleted user from the users list
        setUsers(users.filter((user) => user.id !== userId));
        setSuccess("User deleted successfully!");
      }
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="user-list">
      <h1>User List</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <p>List of all users will appear here.</p>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.dob)}</td> {/* Formatted date */}
              <td>
                <button className="edit-btn" onClick={() => openModal(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing user details */}
      {isModalOpen && currentUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <form onSubmit={handleSave}>
              <label>Name:</label>
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    name: e.target.value,
                  })
                }
              />

              <label>Email:</label>
              <input
                type="email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    email: e.target.value,
                  })
                }
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                value={currentUser.dob}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    dob: e.target.value,
                  })
                }
              />

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
