import React from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetKycDataQuery } from "../features/api/kycApiSlice";

const SuccessPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetKycDataQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-red-600">
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border border-gray-200 text-center">
        {/* Status Icon */}
        <div className="flex justify-center mb-4">{statusIcon}</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {kycStatus === "Verified"
            ? `Congratulations, ${firstName}!`
            : kycStatus === "Rejected"
            ? `Hello, ${firstName}.`
            : `Thank You, ${firstName}!`}
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {kycStatus === "Verified"
            ? "Your identity has been successfully verified."
            : kycStatus === "Rejected"
            ? "We regret to inform you that your verification was unsuccessful. Please review your submission."
            : "Your verification is under review. You will receive an update shortly via email."}
        </p>

        {/* KYC Status Badge */}

        {/* User Selfie */}
        {selfieImage && (
          <div className="flex justify-center">
            <img
              src={selfieImage}
              alt="User Selfie"
              crossOrigin="anonymous"
              className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-md object-cover"
            />
          </div>
        )}

        <div
          className={`inline-block px-6 py-2 text-base font-semibold shadow-md mb-6 rounded-full ${
            kycStatus === "Rejected"
              ? "bg-red-600 text-white"
              : kycStatus === "Verified"
              ? "bg-green-600 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          KYC Status: {kycStatus}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
