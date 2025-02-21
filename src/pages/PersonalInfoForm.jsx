import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Typography, Box, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../features/api/usersApiSlice";
import { setCredentials } from "../features/auth/authSlice";

function PersonalInfoForm({ onNext, onBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error on input change
  };

  // Check if all required fields are filled
  const isFormComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      try {
        const response = await register(formData).unwrap(); // Call register API
        dispatch(setCredentials(response)); // Update user and token in state
        onNext(formData); // Proceed to the next step
      } catch (err) {
        setError(err?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Paper
        elevation={3}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <Typography
          variant="h6"
          className="text-center font-medium mb-4 text-gray-800"
        >
          Personal Information
        </Typography>
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Choose a username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@domain.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="1234567890"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center mt-2">{error}</p>
          )}
          <Box className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            >
              <ChevronLeft className="mr-1" /> Back
            </button>
            <button
              type="submit"
              disabled={!isFormComplete() || isLoading} // Disable when form is incomplete or loading
              className={`px-3 py-2 rounded-lg text-white transition text-sm ${
                isFormComplete()
                  ? "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Processing..." : "Next"}{" "}
              <ChevronRight className="ml-1" />
            </button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default PersonalInfoForm;
