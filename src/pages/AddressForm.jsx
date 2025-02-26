import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useKycMutation } from "../features/api/kycApiSlice"; // Import the mutation
import { setKycId } from "../features/auth/kycSlice";
import { useDispatch } from "react-redux";

function AddressForm({ onBack, onNext, nationalityData }) {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [kyc, { isLoading, error }] = useKycMutation(); // Use the mutation hook
  const dispatch = useDispatch();
// console.log("----------", nationalityData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const mergedData = { ...nationalityData, ...formData }; // Merge previous form data
    console.log("Merged Form Data:", mergedData); // Log merged data

    try {
      // Call the KYC API
      const response = await kyc(mergedData).unwrap();
      const kycId = response?.kyc?.id;
      console.log("KYC ID:", kycId);

      // Pass KYC ID to the next step
      if (kycId) {
        dispatch(setKycId(kycId));
        onNext(kycId); // Pass KYC ID to StepperRoutes
      }}catch (apiError) {
      console.error("API Error:", apiError);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <Typography
          variant="h5"
          className="text-center font-semibold mb-6 text-gray-800"
        >
          Address Information
        </Typography>
        <form className="space-y-6 mt-2">
          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City/District/Municipality */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City/District/Municipality
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* State/Province/County */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              State/Province/County
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 text-center mt-2">
              {error?.data?.message || "Something went wrong. Please try again."}
            </p>
          )}

          {/* Buttons */}
          <Box className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
            >
              <ChevronLeft className="mr-1" /> Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading} // Disable button while API is loading
              className={`px-4 py-2 rounded-md text-white transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Processing..." : "Next"} <ChevronRight className="ml-1" />
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
