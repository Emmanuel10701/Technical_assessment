"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CircularProgress } from "@mui/material";
import { useTheme } from "../context/themeContext"; // Dynamic theming

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { theme } = useTheme(); // Get theme state

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen flex items-center justify-center p-4`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } p-8 rounded-lg shadow-md w-full max-w-md`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Register to AI Chat Assistant
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded ${
                theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
              } focus:outline-none`}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded ${
                theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
              } focus:outline-none`}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${
                  theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
                } focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-lg"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${
                  theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
                } focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-lg"
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 rounded font-bold transition ${
              theme === "dark"
                ? "bg-indigo-500 hover:bg-indigo-400"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className={`${
              theme === "dark" ? "text-indigo-400" : "text-indigo-600"
            } hover:underline`}
          >
            Sign in
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
