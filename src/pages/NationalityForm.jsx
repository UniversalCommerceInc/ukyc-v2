// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// import FlagsSelect from "react-flags-select";
// import { Typography } from "@mui/material";

// function NationalityForm({ onBack, onNext, onIdTypeChange }) {
//   const [formData, setFormData] = useState({
//     nationality: "",
//     dob: "",
//     idType: "",
//     idNumber: "",
//     issueDate: "",
//     expiryDate: "",
//     issueCountry: "",
//     residenceCountry: "",
//   });

//   const handleSelectChange = (countryCode, name) => {
//     setFormData({ ...formData, [name]: countryCode });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "idType") {
//       onIdTypeChange(value); // Pass the selected ID type to the parent component
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
//         <Typography
//           variant="h6"
//           className="text-center font-medium mb-4 text-gray-800"
//         >
//           Nationality Information
//         </Typography>

//         <form className="space-y-6 mt-2">
//           {/* Nationality Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Nationality
//             </label>
//             <FlagsSelect
//               selected={formData.nationality}
//               onSelect={(code) => handleSelectChange(code, "nationality")}
//               className="w-full"
//               placeholder="Select Nationality"
//             />
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* ID Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               ID Type
//             </label>
//             <select
//               name="idType"
//               value={formData.idType}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="" disabled>
//                 Select ID Type
//               </option>
//               <option value="aadhaar-card">Aadhaar Card</option>
//               <option value="passport">Passport</option>
//               <option value="pan-card">PAN Card</option>
//             </select>
//           </div>

//           {/* ID Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               ID Number
//             </label>
//             <input
//               type="text"
//               name="idNumber"
//               value={formData.idNumber}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter ID Number"
//             />
//           </div>

//           {/* Issue Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Issue Date
//             </label>
//             <input
//               type="date"
//               name="issueDate"
//               value={formData.issueDate}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Conditional Expiry Date */}
//           {formData.idType && formData.idType !== "adhaar" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Expiry Date
//               </label>
//               <input
//                 type="date"
//                 name="expiryDate"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           )}

//           {/* ID Issue Country */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               ID Issue Country
//             </label>
//             <FlagsSelect
//               selected={formData.issueCountry}
//               onSelect={(code) => handleSelectChange(code, "issueCountry")}
//               className="w-full"
//               placeholder="Select Issue Country"
//             />
//           </div>

//           {/* Country of Residence */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Country of Residence
//             </label>
//             <FlagsSelect
//               selected={formData.residenceCountry}
//               onSelect={(code) => handleSelectChange(code, "residenceCountry")}
//               className="w-full"
//               placeholder="Select Residence Country"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between pt-6">
//             <button
//               type="button"
//               onClick={onBack}
//               disabled // Disable Back button
//               className="px-4 py-2 border border-gray-400 text-gray-400 rounded-md cursor-not-allowed"
//             >
//               <ChevronLeft className="mr-1" /> Back
//             </button>
//             <button
//               type="button"
//               onClick={() => onNext(formData)} // Pass form data on Next
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//             >
//               Next <ChevronRight className="ml-1" />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NationalityForm;


import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Select from "react-select";
import { Typography } from "@mui/material";

const countryOptions = [
  { label: "India", value: "India" },
  { label: "United States", value: "United States" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Australia", value: "Australia" },
  { label: "Canada", value: "Canada" },
  { label: "Germany", value: "Germany" },
  { label: "France", value: "France" },
  // Add more countries as needed
];

function NationalityForm({ onBack, onNext, onIdTypeChange }) {
  const [formData, setFormData] = useState({
    nationality: "",
    dob: "",
    idType: "",
    idNumber: "",
    idIssueDate: "",
    idExpiryDate: "",
    idIssuingCountry: "",
    countryOfResidence: "",
  });

  const handleSelectChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption?.value || "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "idType" && typeof onIdTypeChange === "function") {
      onIdTypeChange(value); // Call the function only if it exists
    }
  };
  
  const handleNext = () => {
    const updatedFormData = { ...formData };

    // Remove `idExpiryDate` if ID type is Aadhaar Card
    if (updatedFormData.idType === "aadhaar-card") {
      delete updatedFormData.idExpiryDate;
    }

    onNext(updatedFormData); // Pass the updated form data
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <Typography
          variant="h6"
          className="text-center font-medium mb-4 text-gray-800"
        >
          Nationality Information
        </Typography>

        <form className="space-y-6 mt-2">
          {/* Nationality Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nationality
            </label>
            <Select
              options={countryOptions}
              value={countryOptions.find(
                (option) => option.value === formData.nationality
              )}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "nationality")
              }
              placeholder="Select Nationality"
              isSearchable
              className="w-full"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* ID Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ID Type
            </label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select ID Type
              </option>
              <option value="aadhaar-card">Aadhaar Card</option>
              <option value="passport">Passport</option>
              <option value="pan-card">PAN Card</option>
              <option value="dl">Driving Licence</option>
              <option value="voter-id">Voter ID</option>


            </select>
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ID Number
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter ID Number"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              name="idIssueDate"
              value={formData.idIssueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Conditional Expiry Date */}
          {formData.idType && formData.idType !== "aadhaar-card" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="idExpiryDate"
                value={formData.idExpiryDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* ID Issue Country */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ID Issue Country
            </label>
            <Select
              options={countryOptions}
              value={countryOptions.find(
                (option) => option.value === formData.idIssuingCountry
              )}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "idIssuingCountry")
              }
              placeholder="Select Issue Country"
              isSearchable
              className="w-full"
            />
          </div>

          {/* Country of Residence */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Country of Residence
            </label>
            <Select
              options={countryOptions}
              value={countryOptions.find(
                (option) => option.value === formData.countryOfResidence
              )}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "countryOfResidence")
              }
              placeholder="Select Residence Country"
              isSearchable
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              disabled // Disable Back button
              className="px-4 py-2 border border-gray-400 text-gray-400 rounded-md cursor-not-allowed"
            >
              <ChevronLeft className="mr-1" /> Back
            </button>
            <button
              type="button"
              // onClick={() => onNext(formData)} 
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Next <ChevronRight className="ml-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NationalityForm;
