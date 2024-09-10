import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error in registerUser API:", error?.response?.data || error);
    throw error?.response?.data || error.message;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error in loginUser API:", error?.response?.data || error);
    throw error?.response?.data || error.message;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in logoutUser API:", error?.response?.data || error);
    throw error?.response?.data || error.message;
  }
};

// Fetch user details

// src/api.js
export const getUserDetails = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure this matches what you set on login
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error;
  }
};
