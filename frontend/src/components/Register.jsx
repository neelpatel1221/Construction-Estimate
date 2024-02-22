// CreateAccountForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [createAccountFormData, setCreateAccountFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCreateAccountFormData({
      ...createAccountFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/v1/users/register",
        createAccountFormData,
        {
          headers: {
            "Content-Type": "application/json",
            // You might need to include additional headers like authorization token
          },
        }
      );

      if (response.data.success) {
        toast("Account Created");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User Already Exists");
      } else {
        toast.error("API request failed");
        console.error("API request failed", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

        {/* Create Account Form */}
        <form className="mb-4" onSubmit={handleCreateAccountSubmit}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="createAccountFullName"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="createAccountFullName"
            name="fullName"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your FullName"
            onChange={handleInputChange}
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="createAccountEmail"
          >
            Email:
          </label>
          <input
            type="email"
            id="createAccountEmail"
            name="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />

          <label
            className="block text-gray-700 text-sm font-bold mt-3 mb-2"
            htmlFor="createAccountPassword"
          >
            Password:
          </label>
          <input
            type="password"
            id="createAccountPassword"
            name="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          >
            Create Account
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
