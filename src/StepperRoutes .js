// StepperRoutes.js
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import VerticalStepper from "./components/VerticalStepper";
// import PersonalInfoForm from "./pages/PersonalInfoForm";
// import NationalityForm from "./pages/NationalityForm";
// import AddressForm from "./pages/AddressForm";
// import DocumentUpload from "./pages/DocumentUpload";
// import LiveSelfieCapture from "./pages/LiveSelfieCapture";
// import Navbar from "./components/Navbar";

// const steps = [
//   { path: "personal-info", component: <PersonalInfoForm /> },
//   { path: "nationality", component: <NationalityForm /> },
//   { path: "address", component: <AddressForm /> },
//   { path: "document-upload", component: <DocumentUpload /> },
//   { path: "live-selfie", component: <LiveSelfieCapture /> },
// ];

// const StepperRoutes = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const activeStep = steps.findIndex((step) =>
//     location.pathname.includes(step.path)
//   );
//   const [idType, setIdType] = useState("");

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       navigate(`/steps/${steps[activeStep + 1].path}`);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       navigate(`/steps/${steps[activeStep - 1].path}`);
//     }
//   };

//   const handleIdTypeChange = (selectedIdType) => setIdType(selectedIdType);

//   return (
//     <>
//       <Navbar />
//       <VerticalStepper
//         activeStep={activeStep}
//         onNext={handleNext}
//         onBack={handleBack}
//         idType={idType}
//       >
//         {steps.map((step) =>
//           React.cloneElement(step.component, {
//             onIdTypeChange: handleIdTypeChange,
//           })
//         )}
//       </VerticalStepper>
//     </>
//   );
// };

// export default StepperRoutes;





// const StepperRoutes = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const steps = [
//     { path: "personal-info", component: <PersonalInfoForm /> },
//     { path: "nationality", component: <NationalityForm /> },
//     { path: "address", component: <AddressForm /> },
//     { path: "document-upload", component: <DocumentUpload /> },
//     { path: "live-selfie", component: <LiveSelfieCapture /> },
//   ];

//   const activeStep = steps.findIndex((step) =>
//     location.pathname.includes(step.path)
//   );

//   const [nationalityData, setNationalityData] = useState(null); // Store nationality data
//   const [kycId, setKycId] = useState(null); // Store KYC ID from AddressForm

//   const handleNext = (newData) => {
//     if (activeStep === 1) {
//       setNationalityData(newData);
//       navigate(`/steps/${steps[activeStep + 1].path}`);
//     } else if (activeStep === 2) {
//       setKycId(newData);
//       navigate(`/steps/${newData}/document-upload`);
//     } else if (activeStep === 3) {
//       navigate(`/steps/${kycId}/live-selfie`);
//     } else if (activeStep < steps.length - 1) {
//       navigate(`/steps/${steps[activeStep + 1].path}`);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       navigate(`/steps/${steps[activeStep - 1].path}`);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <VerticalStepper activeStep={activeStep} onNext={handleNext} onBack={handleBack}>
//         {steps.map((step, index) =>
//           React.cloneElement(step.component, {
//             key: index,
//             onBack: handleBack,
//             onNext: handleNext,
//             nationalityData: activeStep === 2 ? nationalityData : null, // Pass nationalityData to AddressForm
//             idType: activeStep === 3 ? "passport" : undefined, // Example to pass idType for DocumentUpload
//           })
//         )}
//       </VerticalStepper>
//     </>
//   );
// };

// export default StepperRoutes;

// import React, { useState } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import VerticalStepper from "./components/VerticalStepper";
// import PersonalInfoForm from "./pages/PersonalInfoForm";
// import NationalityForm from "./pages/NationalityForm";
// import AddressForm from "./pages/AddressForm";
// import DocumentUpload from "./pages/DocumentUpload";
// import LiveSelfieCapture from "./pages/LiveSelfieCapture";
// import { NestCamWiredStandSharp } from "@mui/icons-material";

// const StepperRoutes = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams(); // Extract dynamic segment from the route

//   // Steps array with static and dynamic paths
//   const steps = [
//     { path: "personal-info", label: "Personal Info" },
//     { path: "nationality", label: "Nationality" },
//     { path: "address", label: "Address" },
//     { path: "document-upload", label: "Document Upload", dynamic: true },
//     { path: "live-selfie", label: "Live Selfie", dynamic: true },
//   ];

//   // Calculate the active step
//   const activeStep = steps.findIndex((step) => {
//     if (step.dynamic) {
//       // For dynamic paths, check if the base path matches
//       return location.pathname.includes(step.path);
//     }
//     // For static paths, check exact match
//     return location.pathname.endsWith(step.path);
//   });

//   const [nationalityData, setNationalityData] = useState(null); // Store nationality data
//   const [kycId, setKycId] = useState(null); // Store KYC ID from AddressForm
//   const [docImg, setDocImg] = useState(null); // Store document image from DocumentUpload
//   console.log(kycId)

//   const handleNext = (newData) => {
//     if (activeStep === 1) {
//       setNationalityData(newData);
//       navigate(`/steps/address`);
//     } else if (activeStep === 2) {
//       setKycId(newData); // Save the KYC ID
//       navigate(`/steps/${newData}/document-upload`); // Navigate to document-upload with KYC ID

//     } else if (activeStep === 3) {
//       setDocImg(newData)
//       navigate(`/steps/${kycId}/live-selfie`); // Navigate to live-selfie with KYC ID
//     } else if (activeStep < steps.length - 1) {
//       navigate(`/steps/${steps[activeStep + 1].path}`);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       navigate(`/steps/${steps[activeStep - 1].path}`);
//     }
//   };

//   return (
//     <VerticalStepper activeStep={activeStep} onNext={handleNext} onBack={handleBack}>
//       {[
//         <PersonalInfoForm onNext={handleNext} onBack={handleBack} />,
//         <NationalityForm onNext={handleNext} onBack={handleBack} />,
//         <AddressForm
//           onNext={handleNext}
//           onBack={handleBack}
//           nationalityData={nationalityData}
//         />,
//         <DocumentUpload onNext={handleNext} idType="passport" id={kycId} />,
//         <LiveSelfieCapture onNext={handleNext} id={kycId}  docImg={docImg}/>,
//       ]}
//     </VerticalStepper>
//   );
// };

// export default StepperRoutes;


import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import VerticalStepper from "./components/VerticalStepper";
import PersonalInfoForm from "./pages/PersonalInfoForm";
import NationalityForm from "./pages/NationalityForm";
import AddressForm from "./pages/AddressForm";
import DocumentUpload from "./pages/DocumentUpload";
import LiveSelfieCapture from "./pages/LiveSelfieCapture";

const StepperRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Extract dynamic segment from the route

  // Steps array with static and dynamic paths
  const steps = [
    { path: "personal-info", label: "Personal Info" },
    { path: "nationality", label: "Nationality" },
    { path: "address", label: "Address" },
    { path: "document-upload", label: "Document Upload", dynamic: true },
    { path: "live-selfie", label: "Live Selfie", dynamic: true },
  ];

  // Calculate the active step
  const activeStep = steps.findIndex((step) => {
    if (step.dynamic) {
      // Match dynamic paths like `/document-upload/:id`
      return location.pathname.includes(step.path);
    }
    return location.pathname.endsWith(step.path);
  });

  const [nationalityData, setNationalityData] = useState(null); // Store nationality data
  const [kycId, setKycId] = useState(id || null); // Initialize KYC ID with the URL param if available
  const [docImg, setDocImg] = useState(null); // Store document image from DocumentUpload

  const handleNext = (newData) => {
    if (activeStep === 1) {
      setNationalityData(newData);
      navigate(`/steps/address`);
    } else if (activeStep === 2) {
      setKycId(newData); // Save the KYC ID
      navigate(`/steps/document-upload/${newData}`); // Navigate to document-upload with KYC ID
    } else if (activeStep === 3) {
      setDocImg(newData); // Save document image
      navigate(`/steps/live-selfie/${kycId}`); // Navigate to live-selfie with KYC ID
    } else if (activeStep < steps.length - 1) {
      // Navigate to the next step in the static path
      navigate(`/steps/${steps[activeStep + 1].path}`);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      if (steps[activeStep - 1].dynamic) {
        // For dynamic routes, construct the path with the KYC ID
        const dynamicPath = `/steps/${steps[activeStep - 1].path}/${kycId}`;
        navigate(dynamicPath);
      } else {
        navigate(`/steps/${steps[activeStep - 1].path}`);
      }
    }
  };

  return (
    <VerticalStepper activeStep={activeStep} onNext={handleNext} onBack={handleBack}>
      {[
        <PersonalInfoForm onNext={handleNext} onBack={handleBack} />,
        <NationalityForm onNext={handleNext} onBack={handleBack} />,
        <AddressForm onNext={handleNext} onBack={handleBack} nationalityData={nationalityData} />,
        <DocumentUpload onNext={handleNext} onBack={handleBack} id={kycId} />,
        <LiveSelfieCapture onNext={handleNext} onBack={handleBack} id={kycId} docImg={docImg} />,
      ]}
    </VerticalStepper>
  );
};

export default StepperRoutes;
