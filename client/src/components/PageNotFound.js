import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router v6

export default function PageNotFound() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl font-bold mb-8"
      >
        Page Not Found
      </motion.div>
      <motion.button
        onClick={redirectToHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Home
      </motion.button>
    </motion.div>
  );
}
