import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TeamLead = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store the decoded user role

  const fetchProjects = async (token) => {
    if (!token) {
      console.error("No token found. Please log in.");
      setError("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8080/api/tasks/All", {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is included
        },
      });
  
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err.response || err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch projects"
      );
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token being used:", token); // Debugging: log the token
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        console.log("Decoded JWT payload:", payload); // Debugging: log the payload
        setUserRole(payload.role); // Store the role in state
        fetchProjects(token); // Fetch projects after decoding the token
      } catch (err) {
        console.error("Error decoding token:", err);
        setUserRole(null);
        setError("Invalid token. Please log in again.");
      }
    } else {
      console.error("No token found. Please log in.");
      setError("No token found. Please log in.");
    }
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Team Lead Dashboard</h3>

      {error && (
        <p className="text-red-500 mb-4">Failed to load projects: {error}</p>
      )}

      {userRole && (
        <p className="text-gray-400 mb-4">
          Logged in as: <span className="text-blue-300 font-bold">{userRole}</span>
        </p>
      )}

      <div className="space-y-4">
        {projects.length === 0 && !error && (
          <p className="text-gray-400">Loading projects...</p>
        )}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-gray-700 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h4 className="text-lg font-semibold text-blue-300">
              {project.name}
            </h4>
            <p className="text-gray-400">{project.description}</p>
            <p className="text-sm text-gray-500">Created by: {project.creator}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamLead;
