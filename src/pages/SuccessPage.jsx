import React from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useGetKycDataQuery } from "../features/api/kycApiSlice";

const SuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetKycDataQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-600">
          Error fetching data. Please try again.
        </div>
      </div>
    );
  }

  const { kyc } = data;
  const { name, email, kycStatus, selfieImage } = kyc;
  const firstName = name.split(" ")[0];

  // Determine status icon
  const statusIcon =
    kycStatus === "Verified" ? (
      <FaCheckCircle className="text-green-500 text-8xl drop-shadow-lg" />
    ) : kycStatus === "Rejected" ? (
      <FaTimesCircle className="text-red-500 text-8xl drop-shadow-lg" />
    ) : (
      <FaHourglassHalf className="text-yellow-500 text-8xl drop-shadow-lg" />
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-gray-300 text-center relative">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">{statusIcon}</div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {kycStatus === "Verified"
            ? `Congratulations, ${firstName}!`
            : kycStatus === "Rejected"
            ? `Hello, ${firstName}.`
            : `Thank You, ${firstName}!`}
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-6 text-lg">
          {kycStatus === "Verified"
            ? "Your identity has been successfully verified."
            : kycStatus === "Rejected"
            ? "We regret to inform you that your verification was unsuccessful. Please review your submission."
            : "Your verification is under review. You will receive an update shortly via email."}
        </p>

        {/* User Selfie */}
        {selfieImage && (
          <div className="flex justify-center mb-4">
            <img
              src={selfieImage}
              alt="User Selfie"
              crossOrigin="anonymous"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
            />
          </div>
        )}

        {/* KYC Status Badge */}
        <div
          className={`inline-block px-6 py-2 text-lg font-semibold shadow-md mb-6 rounded-full transition-all duration-300 ${
            kycStatus === "Rejected"
              ? "bg-red-600 text-white"
              : kycStatus === "Verified"
              ? "bg-green-600 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          KYC Status: {kycStatus}
        </div>

        {/* View Details Button */}
        <button
          className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          onClick={() => navigate(`/kyc/${kyc.id}`)}
        >
          View KYC Details
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;