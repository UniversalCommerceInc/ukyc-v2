import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

function Consent() {
  const [transformStyle, setTransformStyle] = useState({
    opacity: 0,
    transform: "scale(0.5)",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animation when the component mounts
    const timer = setTimeout(() => {
      setTransformStyle({
        opacity: 1,
        transform: "scale(1)",
        transition: "all 0.5s ease-out",
      });
    }, 100); // Delay to allow browser to render initial state

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        style={transformStyle}
        className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6 text-center">
          <img
            src={logo}
            alt="Universal KYC Logo"
            className="mx-auto h-20 w-20"
          />{" "}
          {/* Logo is added here */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-4">
            Welcome to UNIVERSAL KYC Program
          </h1>
          <p className="text-gray-600 mt-4">
            Please read the terms and click "Consent" to continue. If you have
            submitted your documents, you can check your status.
          </p>
        </div>
        <div className="flex justify-around p-4 bg-gray-100">
          <button
            onClick={() => navigate("/steps/personal-info")}
            className="transition duration-300 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Consent
          </button>
          <button
            onClick={() => alert("Consent Denied")}
            className="transition duration-300 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consent;
