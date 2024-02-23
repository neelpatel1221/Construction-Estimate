import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
          // You might need to include additional headers like authorization token
        },
      });
      // Handle successful API response
      if (response.data.success) {
        toast.success("Successfully LoggedIn");
        navigate("/estimator");
      }
    } catch (error) {
      // Handle API errors
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response && error.response.status === 404) {
        toast.error("User Not Found");
      } else {
        toast.error("API request failed");
        console.error("API request failed", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to Our App</h2>

        {/* Login Form */}
        <form className="mb-4" onSubmit={handleFormSubmit}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
            onChange={handleInputChange}
            required
          />

          <label
            className="block text-gray-700 text-sm font-bold mt-3 mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
        </form>

        {/* Create Account Option */}
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create one here
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
