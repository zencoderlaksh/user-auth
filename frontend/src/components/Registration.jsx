import React, { useState } from "react"; // <-- Added useState import
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../api"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For card animations
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password visibility toggle

const registrationSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // For password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password toggle
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data); // Call the register API
      console.log("Registration successful:", response);
      reset(); // Reset the form on successful registration
      navigate("/home");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="relative h-screen bg-black">
      {/* Starry background */}
      <div className="absolute inset-0 z-0">
        <div className="space-background"></div>
      </div>

      {/* Registration Form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-lg p-8 w-full max-w-md"
          style={{ boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)" }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Form Fields */}
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">Name</label>
                  <input
                    {...register("name")}
                    className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">Email</label>
                  <input
                    {...register("email")}
                    className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer text-black"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">Address</label>
                  <input
                    {...register("address")}
                    className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                  />
                  {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                  )}
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer text-black"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">Phone Number</label>
                  <input
                    {...register("phoneNumber")}
                    className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">City</label>
                  <input
                    {...register("city")}
                    className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-black focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500">{errors.city.message}</p>
                  )}
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12">
                <div>
                  <label className="block text-white">State</label>
                  <input
                    {...register("state")}
                    className="form-control rounded-lg px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"
                  />
                  {errors.state && (
                    <p className="text-red-500">{errors.state.message}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-white">
              Already registered?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Login here
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
