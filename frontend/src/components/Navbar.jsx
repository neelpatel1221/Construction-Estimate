import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ... (imports)

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false);
    // setIsLoggedIn(accessToken ? true : false);
  }); // Fix: add dependency array to useEffect

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/users/logout");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isCurrentPage = (path) => location.pathname === path;

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-white">
          ConstructEstimate Pro
        </h1>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <nav
          className={`lg:flex items-center ${
            isMenuOpen ? "flex" : "hidden"
          } mt-4 lg:mt-0`}
        >
          <Link
            to="/estimator"
            className={`text-white hover:text-gray-300 ml-4 ${
              isCurrentPage("/estimator") ? "underline" : ""
            }`}
            onClick={closeMenu}
          >
            Estimator
          </Link>
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ml-4 ${
              isCurrentPage("/") ? "underline" : ""
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/account"
                className={`text-white hover:text-gray-300 ml-4`}
                onClick={closeMenu}
              >
                Account
              </Link>
              <Link
                to="/logout"
                className={`text-white hover:text-gray-300 ml-4`}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-white hover:text-gray-300 ml-4 ${
                  isCurrentPage("/login") ? "underline" : ""
                }`}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`text-white hover:text-gray-300 ml-4 ${
                  isCurrentPage("/register") ? "underline" : ""
                }`}
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </nav>
        <ToastContainer />
      </div>
    </header>
  );
};

export default Navbar;
