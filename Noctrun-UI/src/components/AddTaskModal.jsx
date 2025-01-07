// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const AddTaskModal = ({ isOpen, onClose, creator }) => {
//   const [formData, setFormData] = useState({
//     assignedTo: "",
//     title: "",
//     description: "",
//     status: "",
//     priority: 0,
//     deadline: "",
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("No token found. Please log in.");
//         return;
//       }

//       const dataToSend = { ...formData, createdBy: creator };
//       await axios.post("http://localhost:8080/api/tasks/create-task", dataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Task added successfully!");
//       onClose(); // Close modal after successful submission
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add task");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <motion.div
//         className="bg-white text-gray-800 w-96 p-6 rounded-lg shadow-lg relative"
//         initial={{ scale: 0.8 }}
//         animate={{ scale: 1 }}
//         transition={{ type: "spring", stiffness: 300 }}
//       >
//         <h2 className="text-2xl font-semibold text-center mb-6">Add New Task</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Assigned To */}
//           <div className="relative">
//             <input
//               type="text"
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
//               placeholder=" "
//               required
//             />
//             <label
//               className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-blue-500"
//             >
//               Assigned To
//             </label>
//           </div>

//           {/* Title */}
//           <div className="relative">
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
//               placeholder=" "
//               required
//             />
//             <label
//               className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-blue-500"
//             >
//               Title
//             </label>
//           </div>

//           {/* Description */}
//           <div className="relative">
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
//               placeholder=" "
//               rows="3"
//               required
//             />
//             <label
//               className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-blue-500"
//             >
//               Description
//             </label>
//           </div>

//           {/* Status */}
//           <div className="relative">
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500 bg-white"
//             >
//               <option value="TO-DO">TO-DO</option>
//               <option value="IN-PROGRESS">IN-PROGRESS</option>
//               <option value="COMPLETED">COMPLETED</option>
//             </select>
//             <label className="absolute left-4 top-2.5 text-gray-500 text-sm">
//               Status
//             </label>
//           </div>

//           {/* Priority */}
//           <div className="relative">
//             <input
//               type="number"
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//               className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
//               min="1"
//               max="5"
//               placeholder=" "
//               required
//             />
//             <label
//               className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-blue-500"
//             >
//               Priority
//             </label>
//           </div>

//           {/* Deadline */}
//           <div className="relative">
//             <input
//               type="datetime-local"
//               name="deadline"
//               value={formData.deadline}
//               onChange={handleChange}
//               className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
//               required
//             />
//             <label
//               className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-blue-500"
//             >
//               Deadline
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               Add Task
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AddTaskModal;

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddTaskModal = ({ isOpen, onClose, creator }) => {
  const [formData, setFormData] = useState({
    assignedTo: "",
    title: "",
    description: "",
    status: "",
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
      await axios.post("http://localhost:8080/api/tasks/create-task", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Task</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Assigned To */}
          <div className="relative">
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
              required
            />
            
             <label
             className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-focus:top-2.5 peer-focus:text-blue-500 peer-focus:text-sm"
             >
    
           
              Assigned To
            </label>
          </div>

          {/* Title */}
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
              required
            />
            <label
              className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-focus:top-2.5 peer-focus:text-blue-500"
            >
              Title
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
              rows="3"
              required
            />
            <label
              className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-focus:top-2.5 peer-focus:text-blue-500"
            >
              Description
            </label>
          </div>

          {/* Status */}
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="TO-DO">TO-DO</option>
              <option value="IN-PROGRESS">IN-PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <label className="absolute left-4 top-2.5 text-gray-500 text-sm">
              Status
            </label>
          </div>

          {/* Priority */}
          <div className="relative">
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
              min="1"
              max="5"
              required
            />
            <label
              className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-focus:top-2.5 peer-focus:text-blue-500"
            >
              Priority
            </label>
          </div>

          {/* Deadline */}
          <div className="relative">
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="peer w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-500"
              required
            />
            <label
              className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-focus:top-2.5 peer-focus:text-blue-500"
            >
              Deadline
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
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
