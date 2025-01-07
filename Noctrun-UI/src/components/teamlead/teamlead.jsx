// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { BiEdit, BiTrash, BiUserPlus, BiSun, BiMoon } from "react-icons/bi"; // Added icons for theme toggle

// const TeamLead = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterBy, setFilterBy] = useState("all");
//   const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

//   const fetchProjects = async (token) => {
//     if (!token) {
//       setError("No token found. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:8080/api/tasks/All", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProjects(response.data);
//       setFilteredProjects(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to fetch projects"
//       );
//     }
//   };

//   const handleEdit = (projectId) => {
//     alert(`Edit project with ID: ${projectId}`);
//   };

//   const handleDelete = (projectId) => {
//     alert(`Delete project with ID: ${projectId}`);
//   };

//   const handleAssign = (projectId) => {
//     alert(`Assign users to project with ID: ${projectId}`);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     filterProjects(e.target.value, filterBy);
//   };

//   const handleFilter = (e) => {
//     setFilterBy(e.target.value);
//     filterProjects(searchQuery, e.target.value);
//   };

//   const filterProjects = (query, filter) => {
//     let updatedProjects = projects;

//     if (query) {
//       updatedProjects = updatedProjects.filter((project) =>
//         project.title.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     if (filter !== "all") {
//       updatedProjects = updatedProjects.filter(
//         (project) => project.status.toLowerCase() === filter.toLowerCase()
//       );
//     }

//     setFilteredProjects(updatedProjects);
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         setUserRole(payload.role);
//         fetchProjects(token);
//       } catch (err) {
//         setUserRole(null);
//         setError("Invalid token. Please log in again.");
//       }
//     } else {
//       setError("No token found. Please log in.");
//     }
//   }, []);

//   return (
//     <div
//       className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-8`}
//     >
//       <motion.div
//         className="text-center mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-4xl font-extrabold">Team Lead Dashboard</h1>
//         {userRole && (
//           <p className="mt-2 text-gray-400">
//             Logged in as:{" "}
//             <span className="text-blue-300 font-bold">{userRole}</span>
//           </p>
//         )}
//       </motion.div>

//       {error && (
//         <motion.p
//           className="text-red-500 text-center mb-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           {error}
//         </motion.p>
//       )}

//       {/* Theme Toggle Icon - Positioned Above All Status and Aligned Right */}
// <div className="flex justify-end mb-4">
//   <button
//     onClick={toggleTheme}
//     className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
//   >
//     {isDarkMode ? <BiSun className="text-xl" /> : <BiMoon className="text-xl" />}
//   </button>
// </div>

//       {/* Search and Filter */}
//       <div className="mb-6 flex flex-col sm:flex-row sm:justify-between items-center">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search by title..."
//           className={`px-4 py-2 rounded border border-gray-400 w-full sm:w-auto mb-4 sm:mb-0 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
//         />
//         <select
//           value={filterBy}
//           onChange={handleFilter}
//           className={`px-4 py-2 rounded border border-gray-400 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       <motion.div
//         className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
//         }}
//       >
//         {filteredProjects.length === 0 && !error ? (
//           <motion.p
//             className="text-center text-gray-400"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             No projects found.
//           </motion.p>
//         ) : (
//           filteredProjects.map((project) => (
//             <motion.div
//               key={project.id}
//               className={`p-6 rounded-lg shadow-md hover:shadow-lg ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-all`}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//             >
//               <h3 className={`text-xl font-bold ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}>
//                 {project.title}
//               </h3>
//               <p className="text-gray-400 mt-2">{project.description}</p>
//               <p className="text-sm mt-4">Created by: {project.creator || "Unknown"}</p>
//               <p className="text-sm mt-2">Status: {project.status}</p>

//               <div className="mt-4 flex justify-between">
//                 <button
//                   onClick={() => handleEdit(project.id)}
//                   className="flex items-center text-blue-400 hover:text-blue-500 transition"
//                 >
//                   <BiEdit className="mr-2" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(project.id)}
//                   className="flex items-center text-red-400 hover:text-red-500 transition"
//                 >
//                   <BiTrash className="mr-2" />
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleAssign(project.id)}
//                   className="flex items-center text-green-400 hover:text-green-500 transition"
//                 >
//                   <BiUserPlus className="mr-2" />
//                   Assign
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default TeamLead;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BiEdit,
  BiTrash,
  BiUserPlus,
  BiSun,
  BiMoon,
  BiPlusCircle,
} from "react-icons/bi";
import AddTaskModal from "../AddTaskModal";

const TeamLead = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tasksPerPage = 6;

  const fetchProjects = async (token) => {
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/tasks/All", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch projects"
      );
    }
  };

  const handleEdit = (projectId) => {
    alert(`Edit project with ID: ${projectId}`);
  };

  const handleDelete = (projectId) => {
    alert(`Delete project with ID: ${projectId}`);
  };

  const handleAssign = (projectId) => {
    alert(`Assign users to project with ID: ${projectId}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterProjects(e.target.value, filterBy);
  };

  const handleFilter = (e) => {
    setFilterBy(e.target.value);
    filterProjects(searchQuery, e.target.value);
  };

  const filterProjects = (query, filter) => {
    let updatedProjects = projects;

    if (query) {
      updatedProjects = updatedProjects.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter !== "all") {
      updatedProjects = updatedProjects.filter(
        (project) => project.status.toLowerCase() === filter.toLowerCase()
      );
    }

    setFilteredProjects(updatedProjects);
    setCurrentPage(1); // Reset to first page on filter or search
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
        fetchProjects(token);
      } catch (err) {
        setUserRole(null);
        setError("Invalid token. Please log in again.");
      }
    } else {
      setError("No token found. Please log in.");
    }
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredProjects.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const totalPages = Math.ceil(filteredProjects.length / tasksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } p-8`}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold">Team Lead Dashboard</h1>
        {userRole && (
          <p className="mt-2 text-gray-400">
            Logged in as:{" "}
            <span className="text-blue-300 font-bold">{userRole}</span>
          </p>
        )}
      </motion.div>

      {/* Theme Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          {isDarkMode ? (
            <BiSun className="text-xl" />
          ) : (
            <BiMoon className="text-xl" />
          )}
        </button>
      </div>

      <div className="flex justify-end mb-4">
  <button
    onClick={() => setIsModalOpen(true)}
    className="flex items-center justify-center p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
    title="Add Task"
  >
    <BiPlusCircle className="text-2xl" />
  </button>
</div>

<AddTaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  creator={userRole}
/>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title..."
          className={`px-4 py-2 rounded border border-gray-400 w-full sm:w-auto mb-4 sm:mb-0 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
        <select
          value={filterBy}
          onChange={handleFilter}
          className={`px-4 py-2 rounded border border-gray-400 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tasks Grid */}
      <motion.div
        className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {currentTasks.length === 0 && !error ? (
          <motion.p
            className="text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No projects found.
          </motion.p>
        ) : (
          currentTasks.map((project) => (
            <motion.div
              key={project.id}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-all`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3
                className={`text-xl font-bold ${
                  isDarkMode ? "text-blue-300" : "text-blue-600"
                }`}
              >
                {project.title}
              </h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <p className="text-sm mt-4">
                Created by: {project.creator || "Unknown"}
              </p>
              <p className="text-sm mt-2">Status: {project.status}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(project.id)}
                  className="flex items-center text-blue-400 hover:text-blue-500 transition"
                >
                  <BiEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center text-red-400 hover:text-red-500 transition"
                >
                  <BiTrash className="mr-2" />
                  Delete
                </button>
                <button
                  onClick={() => handleAssign(project.id)}
                  className="flex items-center text-green-400 hover:text-green-500 transition"
                >
                  <BiUserPlus className="mr-2" />
                  Assign
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamLead;
