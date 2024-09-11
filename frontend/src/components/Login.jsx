import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);

      reset();
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with colorful moving balls */}
      <div className="planet-background">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>

      {/* Centered Login Card */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-lg p-8 max-w-md w-full transform perspective-500 hover:rotate-y-6 hover:rotate-x-6 hover:shadow-lg"
          style={{ boxShadow: "0 15px 30px rgba(0, 0, 0, 0.6)" }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white">Email</label>
              <input
                type="email"
                {...register("email")}
                className="form-control rounded-lg w-full px-4 py-2 bg-gray-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password type
                  {...register("password")}
                  className="form-control rounded-lg w-full px-4 py-2 bg-gray-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Icon toggle */}
                </span>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:translate-y-1"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
