import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, logoutUser } from "../api"; // Import the API functions
import { motion } from "framer-motion"; // Import Framer Motion

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUser = async () => {
      try {
        const data = await getUserDetails();
        setUser(data); // Adjust based on actual response structure
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout API
      localStorage.removeItem("token"); // Remove token from local storage
      localStorage.removeItem("userId"); // Remove userId from local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Starry Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* User Content */}
      <motion.div
        className="container relative z-10 mx-auto px-4 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Home</h2>
        {/* 3D Card for User Details */}
        <motion.div
          className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 card-3d"
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }} // 3D hover effect
          whileTap={{ scale: 0.95 }} // Press effect
        >
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="mb-4">
            <strong>Name:</strong> {user.name || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {user.email || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Address:</strong> {user.address || "N/A"}
          </div>
          <div className="mb-4">
            <strong>State:</strong> {user.state || "N/A"}
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-primary w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
