import React from "react";
import logo from "../assets/uc.webp"; // Ensure the path is correct
import bgImage from "../assets/bg.jpg"; // Ensure the path is correct

function SignUp() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-95 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Universal KYC Logo" className="h-20 w-20" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create Your Universal KYC Account
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <select
            name="gender"
            className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled selected>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
