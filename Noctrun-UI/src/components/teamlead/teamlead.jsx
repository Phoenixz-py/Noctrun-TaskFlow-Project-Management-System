// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { BiSearch } from "react-icons/bi";
// // import { RiSunFill, RiMoonFill } from "react-icons/ri";
// // import Confetti from "react-confetti";

// // const TeamLead = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [userRole, setUserRole] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [isDarkMode, setIsDarkMode] = useState(true);

// //   const fetchProjects = async (token) => {
// //     if (!token) {
// //       setError("No token found. Please log in.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.get("http://localhost:8080/api/tasks/All", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setProjects(response.data);
// //       setFilteredProjects(response.data);
// //       setLoading(false);
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || err.message || "Failed to fetch projects"
// //       );
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       try {
// //         const payload = JSON.parse(atob(token.split(".")[1]));
// //         setUserRole(payload.role);
// //         fetchProjects(token);
// //       } catch (err) {
// //         setUserRole(null);
// //         setError("Invalid token. Please log in again.");
// //       }
// //     } else {
// //       setError("No token found. Please log in.");
// //     }
// //   }, []);

// //   const handleSearch = (e) => {
// //     setSearch(e.target.value);
// //     const filtered = projects.filter((project) =>
// //       project.title.toLowerCase().includes(e.target.value.toLowerCase())
// //     );
// //     setFilteredProjects(filtered);
// //   };

// //   const toggleTheme = () => {
// //     setIsDarkMode(!isDarkMode);
// //   };

// //   return (
// //     <div
// //       className={`min-h-screen ${
// //         isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-white"
// //       } text-${isDarkMode ? "white" : "gray-900"} p-8 transition-all`}
// //     >
// //       <motion.div
// //         className="text-center mb-8"
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //       >
// //         <h1 className="text-4xl font-extrabold">Team Lead Dashboard</h1>
// //         {userRole && (
// //           <p className="mt-2 text-gray-400">
// //             Logged in as:{" "}
// //             <span className={`text-${isDarkMode ? "blue-300" : "blue-600"} font-bold`}>
// //               {userRole}
// //             </span>
// //           </p>
// //         )}
// //       </motion.div>

// //       <div className="flex justify-between items-center mb-6">
// //         <div className="relative">
// //           <input
// //             type="text"
// //             placeholder="Search projects..."
// //             value={search}
// //             onChange={handleSearch}
// //             className={`p-2 rounded-lg ${
// //               isDarkMode
// //                 ? "bg-gray-700 text-white placeholder-gray-400"
// //                 : "bg-gray-100 text-gray-800"
// //             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
// //           />
// //           <BiSearch className="absolute top-2.5 right-2.5 text-gray-400" size={20} />
// //         </div>
// //         <button
// //           onClick={toggleTheme}
// //           className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         >
// //           {isDarkMode ? (
// //             <RiSunFill size={24} className="text-yellow-500" />
// //           ) : (
// //             <RiMoonFill size={24} className="text-gray-800" />
// //           )}
// //         </button>
// //       </div>

// //       {loading && (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {[...Array(6)].map((_, index) => (
// //             <motion.div
// //               key={index}
// //               className="bg-gray-700 animate-pulse p-6 rounded-lg"
// //             ></motion.div>
// //           ))}
// //         </div>
// //       )}

// //       {error && (
// //         <motion.p
// //           className="text-red-500 text-center mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} > {error} </motion.p> )}
// //             {!loading && projects.length > 0 && (
// //     <Confetti
// //       numberOfPieces={isDarkMode ? 200 : 100}
// //       recycle={false}
// //       gravity={0.2}
// //     />
// //   )}

// //   <motion.div
// //     className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
// //     initial="hidden"
// //     animate="visible"
// //     variants={{
// //       hidden: { opacity: 0 },
// //       visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
// //     }}
// //   >
// //     {filteredProjects.length === 0 && !loading && !error ? (
// //       <motion.p
// //         className="text-center text-gray-400"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.6 }}
// //       >
// //         No projects found. Try a different search term.
// //       </motion.p>
// //     ) : (
// //       filteredProjects.map((project, index) => (
// //         <motion.div
// //           key={project.id}
// //           className={`${
// //             isDarkMode ? "bg-gray-700" : "bg-gray-200"
// //           } p-6 rounded-lg shadow-md hover:shadow-lg hover:${
// //             isDarkMode ? "bg-gray-600" : "bg-gray-300"
// //           } transition-all`}
// //           variants={{
// //             hidden: { opacity: 0, y: 20 },
// //             visible: { opacity: 1, y: 0 },
// //           }}
// //         >
// //           <h3
// //             className={`text-xl font-bold ${
// //               isDarkMode ? "text-blue-300" : "text-blue-700"
// //             }`}
// //           >
// //             {project.title}
// //           </h3>
// //           <p className="text-gray-400 mt-2">{project.description}</p>
// //           <p className="text-sm text-gray-500 mt-4">
// //             Created by: {project.creator || "Unknown"}
// //           </p>
// //         </motion.div>
// //       ))
// //     )}
// //   </motion.div>
// // </div>
// // ); };

// // export default TeamLead;

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
//         <button
//           onClick={toggleTheme}
//           className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
//         >
//           {isDarkMode ? <BiSun className="inline" /> : <BiMoon className="inline" />} 
//           {isDarkMode ? " Light Mode" : " Dark Mode"}
//         </button>
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
import { BiEdit, BiTrash, BiUserPlus, BiSun, BiMoon } from "react-icons/bi"; // Added icons for theme toggle

const TeamLead = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

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

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-8`}
    >
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

      {error && (
        <motion.p
          className="text-red-500 text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {/* Theme Toggle Icon - Positioned Above All Status and Aligned Right */}
<div className="flex justify-end mb-4">
  <button
    onClick={toggleTheme}
    className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
  >
    {isDarkMode ? <BiSun className="text-xl" /> : <BiMoon className="text-xl" />}
  </button>
</div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title..."
          className={`px-4 py-2 rounded border border-gray-400 w-full sm:w-auto mb-4 sm:mb-0 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        />
        <select
          value={filterBy}
          onChange={handleFilter}
          className={`px-4 py-2 rounded border border-gray-400 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <motion.div
        className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {filteredProjects.length === 0 && !error ? (
          <motion.p
            className="text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No projects found.
          </motion.p>
        ) : (
          filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-all`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}>
                {project.title}
              </h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <p className="text-sm mt-4">Created by: {project.creator || "Unknown"}</p>
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
    </div>
  );
};

export default TeamLead;
