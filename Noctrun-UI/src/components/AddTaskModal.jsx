import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddTaskModal = ({ isOpen, onClose, creator }) => {
  const [formData, setFormData] = useState({
    assignedTo: "",
    title: "",
    description: "",
    status: "TO-DO",
    priority: 1,
    deadline: "",
  });
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

      const dataToSend = { ...formData, createdBy: creator };
      await axios.post(
        "http://localhost:8080/api/tasks/create-task",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task added successfully!");
      onClose(); // Close modal after successful submission
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
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
        <h2 className="text-2xl font-bold text-center mb-4">Add New Task</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Assigned To */}
          <div className="relative">
            <label
              htmlFor="assignedTo"
              className="text-gray-600 text-sm mb-1 block"
            >
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Title */}
          <div className="relative">
            <label htmlFor="title" className="text-gray-600 text-sm mb-1 block">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="relative">
            <label
              htmlFor="description"
              className="text-gray-600 text-sm mb-1 block"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task description"
              rows="3"
              required
            />
          </div>

          {/* Status */}
          <div className="relative">
            <label htmlFor="status" className="text-gray-600 text-sm mb-1 block">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="TO-DO">TO-DO</option>
              <option value="IN-PROGRESS">IN-PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          {/* Priority */}
          <div className="relative">
            <label
              htmlFor="priority"
              className="text-gray-600 text-sm mb-1 block"
            >
              Priority
            </label>
            <input
              type="number"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              min="1"
              max="5"
              required
            />
          </div>

          {/* Deadline */}
          <div className="relative">
            <label
              htmlFor="deadline"
              className="text-gray-600 text-sm mb-1 block"
            >
              Deadline
            </label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={formData.deadline}
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
              Add Task
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddTaskModal;
