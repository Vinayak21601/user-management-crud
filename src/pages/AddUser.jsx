import React, { useState } from "react";
import axios from "axios";
import "./AddUser.css";
import { apiUrl } from "../api/urls";

const AddUser = () => {
  // Single state object for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.dob) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists
      const checkResponse = await axios.get(`${apiUrl}?email=${formData.email}`);
      if (checkResponse.data.exists) {
        setError("Email already exists. Please use a different email.");
        setLoading(false);
        return;
      }

      // Proceed with user creation
      const response = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.message) {
        setSuccess("User added successfully!");
        setFormData({ name: "", email: "", password: "", dob: "" }); // Reset form
      } else {
        setError(response.data.error || "Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError(error.response?.data?.error || "An error occurred while adding the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-form">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
