import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('./src/assets/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content Section */}
      <section className="relative z-10 text-center px-6 md:px-12 flex flex-col items-center justify-center min-h-screen">
        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold text-white mb-8 tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-blue-400">TaskFlow</span>
          <span className="text-green-400">Pro</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-lg sm:text-xl max-w-lg mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Seamlessly manage your projects and tasks with cutting-edge tools built
          for professionals. Join us now and streamline your workflow.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          className="space-x-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Register Now
          </button>
        </motion.div>
      </section>

      {/* Parallax Effect for Background */}
      <motion.div
        className="absolute inset-0 bg-fixed z-0"
        style={{
          backgroundImage:
            "url('https://getwallpapers.com/wallpaper/full/9/d/c/1429986-gorgeous-black-light-background-1920x1080-samsung.jpg')",
        }}
        initial={{ y: 0 }}
        animate={{ y: -20 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      ></motion.div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-gray-400 text-sm z-10">
        © 2024 TaskFlow Pro. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
