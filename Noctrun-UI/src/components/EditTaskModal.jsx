import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EditTaskModal = ({ isOpen, onClose, taskId, taskDetails, onTaskUpdated }) => {
  const [formData, setFormData] = useState(taskDetails || {});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/tasks/${taskId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task updated successfully!");
      onTaskUpdated(response.data); // Update the task in the parent component
      onClose(); // Close modal after successful submission
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white text-gray-800 w-96 p-6 rounded-lg shadow-lg relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Edit Task</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="text-gray-600 text-sm">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-gray-600 text-sm">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows="3"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="text-gray-600 text-sm">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="TO-DO">TO-DO</option>
              <option value="IN-PROGRESS">IN-PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="text-gray-600 text-sm">
              Priority
            </label>
            <input
              type="number"
              id="priority"
              name="priority"
              value={formData.priority || 1}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              min="1"
              max="5"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="text-gray-600 text-sm">
              Deadline
            </label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={formData.deadline || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assignedTo" className="text-gray-600 text-sm">
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditTaskModal;
