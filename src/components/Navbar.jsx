import React, { useState } from "react";
import logo from "../assets/logo.png"; // Ensure the path to the logo is correct
import { useDispatch } from "react-redux";
import { clearKycId } from "../features/auth/kycSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [showSignOffDialog, setShowSignOffDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setShowSignOffDialog(true);
    setTimeout(() => {
      // dispatch(clearKycId());
      dispatch(logout());
      navigate("/signin");
      setTimeout(() => {
        window.location.reload(); // Refresh the page after a short delay
      }, 10);
    }, 2000); // Simulate a 2-second delay
    
  };

  // Hide logout when on the `/steps/personal-info` route
  const isPersonalInfoRoute = location.pathname === "/steps/personal-info";

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-600 p-4 flex items-center justify-between shadow-md rounded-lg">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Universal KYC Logo"
          className="h-12 w-12 mr-3"
        />
        <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
          Universal KYC
        </h1>
      </div>
      {!isPersonalInfoRoute && (
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-white text-sm md:text-lg hover:text-yellow-300 transition duration-300 ease-in-out"
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      )}

      {/* Animated Dialog */}
      {showSignOffDialog && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Signing Off...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we log you out.
            </p>
            <div className="mt-4">
              <svg
                className="animate-spin h-8 w-8 text-blue-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
