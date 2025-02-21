import React, { useState } from "react";
import {
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
  FaFlag,
  FaLocationArrow,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useGetKycDataQuery } from "../features/api/kycApiSlice";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetKycDataQuery(id);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeImageModal = () => setSelectedImage(null);

  const handleResubmit = () => {
    navigate("/steps/nationality", { state: { resubmitting: true } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        <p className="text-lg text-gray-700 ml-4">Loading KYC details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">
          Unable to fetch KYC details. Please try again.
        </p>
      </div>
    );
  }

  const kyc = data?.kyc;
  // console.log("kyc", kyc)

  return (
    <>
      {/* Navbar (Uncomment if needed) */}
      {/* <Navbar /> */}
      <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-2xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-blue-700 mb-6 sm:mb-8">
          Customer KYC Details
        </h1>

        {/* Personal Info Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-start mb-4 gap-4">
      {/* Image */}
      <img
  src={kyc.selfieImage ? encodeURI(kyc.selfieImage) : "https://via.placeholder.com/150"}
  alt="Selfie"
  crossOrigin="anonymous"
  onClick={() => kyc.selfieImage && openImageModal(kyc.selfieImage)}
  className={`w-24 h-24 object-cover rounded-full shadow-lg border-2 mx-auto sm:mx-0 ${
    kyc.selfieImage ? "border-blue-300 cursor-pointer" : "border-gray-300"
  } hover:opacity-90 transition-transform transform hover:scale-105`}
/>


      {/* Personal Info */}
      <div className="flex-grow text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">{kyc.name}</h2>
        <p className="text-gray-500 flex items-center justify-center sm:justify-start mt-2">
          <FaEnvelope className="mr-2 text-blue-400" /> {kyc.email || "N/A"}
        </p>
      </div>

      {/* Status Badge */}
      <div className="text-center sm:text-right">
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold text-white inline-block ${
            kyc.kycStatus === "Rejected"
              ? "bg-red-600"
              : kyc.kycStatus === "Verified"
              ? "bg-green-600"
              : "bg-yellow-500"
          }`}
        >
          {kyc.kycStatus}
        </span>
      </div>
    </div>

    {/* Details Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700">
      <DetailItem
        icon={<FaCalendarAlt />}
        label="Date of Birth"
        value={new Date(kyc.dob).toLocaleDateString()}
      />
      <DetailItem icon={<FaFlag />} label="Nationality" value={kyc.nationality} />
      <DetailItem icon={<FaIdCard />} label="ID Number" value={kyc.idNumber} />
      <DetailItem
        icon={<FaLocationArrow />}
        label="Address"
        value={`${kyc.addressLine1}, ${kyc.city}, ${kyc.state} - ${kyc.zipCode}`}
      />
    </div>
  </div>

        {/* Document Info Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Document Information
          </h2>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <img
              src={kyc.documentImage || "https://via.placeholder.com/400x200"}
              alt="Document"
              crossOrigin="anonymous"
              onClick={() => kyc.documentImage && openImageModal(kyc.documentImage)}
              className={`w-24 h-16 sm:w-32 sm:h-20 rounded-lg border-2 ${
                kyc.documentImage ? "border-gray-300 cursor-pointer" : "border-gray-400"
              } shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 sm:mr-4`}
            />
            <div>
              <p className="text-gray-800">
                <strong>Document Type:</strong> {kyc.documentType || "N/A"}
              </p>
              <p className="mt-1 text-gray-800">
                <strong>ID Number:</strong> {kyc.idNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>

{kyc?.kycStatus === "Rejected" && (      <div className="p-4 bg-yellow-100 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
    {/* Icon Section */}
    <div className="w-12 h-12 flex items-center justify-center bg-yellow-300 text-yellow-700 rounded-full">
      <FaExclamationTriangle className="text-xl" />
    </div>

    {/* Text Section */}
    <div className="flex-grow">
      <p className="text-gray-800 font-medium mb-2">
        Your KYC submission was rejected.
      </p>
      <p className="text-sm text-gray-600">
        Please review your details and resubmit the necessary information to complete the verification process.
      </p>
    </div>

    {/* Button Section */}
    <div className="w-full sm:w-auto">
      <button
        onClick={handleResubmit}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105 whitespace-nowrap"
      >
        Resubmit Now
      </button>
    </div>
  </div>)
}
        {/* Resubmission Section (Moved to Bottom) */}
  

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="relative">
              <img
                src={selectedImage}
                crossOrigin="anonymous"
                alt="Full View"
                className="max-w-full max-h-screen rounded-lg shadow-lg"
              />
              <button
                onClick={closeImageModal}
                className="absolute top-3 right-3 text-white hover:text-red-500"
              >
                <MdClose className="text-3xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
);

export default CustomerDetail;
