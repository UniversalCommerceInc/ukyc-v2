// // import React, { useState } from "react";
// // import {
// //   Stepper,
// //   Step,
// //   StepLabel,
// //   StepConnector,
// //   Box,
// //   Typography,
// //   useMediaQuery,
// //   Collapse,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import PersonIcon from "@mui/icons-material/Person";
// // import PublicIcon from "@mui/icons-material/Public";
// // import HomeIcon from "@mui/icons-material/Home";
// // import DescriptionIcon from "@mui/icons-material/Description";
// // import CameraAltIcon from "@mui/icons-material/CameraAlt";
// // import { TransitionGroup } from "react-transition-group";

// // // Custom styles for the Stepper connector and icons
// // const CustomConnector = styled(StepConnector)(({ theme }) => ({
// //   "& .MuiStepConnector-line": {
// //     borderLeftWidth: 3,
// //     borderColor: theme.palette.grey[300],
// //     transition: "border-color 0.3s ease",
// //   },
// //   "& .Mui-completed .MuiStepConnector-line": {
// //     borderColor: theme.palette.primary.main,
// //   },
// // }));

// // const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// //   color: theme.palette.grey[400],
// //   backgroundColor: ownerState.active
// //     ? theme.palette.primary.main
// //     : theme.palette.grey[300],
// //   width: 40,
// //   height: 40,
// //   borderRadius: "50%",
// //   transition: "transform 0.3s ease, background-color 0.3s ease",
// //   ...(ownerState.active && {
// //     color: "#fff",
// //     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
// //     transform: "scale(1.1)",
// //   }),
// //   ...(ownerState.completed && {
// //     backgroundColor: theme.palette.primary.main,
// //     color: "#fff",
// //   }),
// // }));

// // function CustomStepIcon(props) {
// //   const { active, completed, icon } = props;
// //   return (
// //     <CustomStepIconRoot ownerState={{ completed, active }}>
// //       {icon}
// //     </CustomStepIconRoot>
// //   );
// // }

// // // Steps configuration
// // const steps = [
// //   { label: "Personal Info", icon: <PersonIcon /> },
// //   { label: "Nationality", icon: <PublicIcon /> },
// //   { label: "Address", icon: <HomeIcon /> },
// //   { label: "Document", icon: <DescriptionIcon /> },
// //   { label: "Selfie", icon: <CameraAltIcon /> },
// // ];

// // function VerticalStepper({ children }) {
// //   const [activeStep, setActiveStep] = useState(0);
// //   const [idType, setIdType] = useState(""); // Holds the selected ID type

// //   const isSmallScreen = useMediaQuery("(max-width: 768px)");

// //   const handleNext = () => {
// //     if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
// //   };

// //   const handleBack = () => {
// //     if (activeStep > 0) setActiveStep((prev) => prev - 1);
// //   };

// //   const handleIdTypeChange = (selectedIdType) => setIdType(selectedIdType);

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
// //       <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center transition-all duration-300 ease-in-out">
// //         {/* Stepper Section */}
// //         <Box
// //           className={`${
// //             isSmallScreen ? "w-full flex justify-center" : "md:w-1/3 border-r"
// //           } border-gray-200 p-4 md:p-8`}
// //           style={{
// //             display: "flex",
// //             justifyContent: "center",
// //             paddingBottom: isSmallScreen ? "1rem" : "2rem",
// //             transition: "all 0.3s ease",
// //           }}
// //         >
// //           <Stepper
// //             activeStep={activeStep}
// //             orientation={isSmallScreen ? "horizontal" : "vertical"}
// //             connector={<CustomConnector />}
// //           >
// //             {steps.map((step, index) => (
// //               <Step key={step.label}>
// //                 <StepLabel
// //                   StepIconComponent={() => (
// //                     <CustomStepIcon
// //                       icon={step.icon}
// //                       completed={activeStep > index}
// //                       active={activeStep === index}
// //                     />
// //                   )}
// //                 >
// //                   {!isSmallScreen && (
// //                     <span className="text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out">
// //                       {step.label}
// //                     </span>
// //                   )}
// //                 </StepLabel>
// //               </Step>
// //             ))}
// //           </Stepper>
// //         </Box>

// //         {/* Render Form based on the active step */}
// //         <Box className="md:w-2/3 w-full p-4 md:p-8 bg-gray-50 flex flex-col justify-center">
// //           <Typography
// //             variant="h5"
// //             className="text-center font-semibold mb-4 text-gray-800 transition-all duration-300 ease-in-out"
// //           >
// //             {steps[activeStep].label}
// //           </Typography>
// //           <TransitionGroup>
// //             <Collapse key={activeStep} timeout={300}>
// //               {children[activeStep] ? (
// //                 React.cloneElement(children[activeStep], {
// //                   onNext: handleNext,
// //                   onBack: handleBack,
// //                   onIdTypeChange: handleIdTypeChange,
// //                   idType,
// //                 })
// //               ) : (
// //                 <Typography color="error">
// //                   Component for this step is not defined.
// //                 </Typography>
// //               )}
// //             </Collapse>
// //           </TransitionGroup>
// //         </Box>
// //       </div>
// //     </div>
// //   );
// // }

// // export default VerticalStepper;

// // VerticalStepper.js
// // VerticalStepper.jsx
// import React from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   StepConnector,
//   Box,
//   Typography,
//   useMediaQuery,
//   Collapse,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { TransitionGroup } from "react-transition-group";
// import PersonIcon from "@mui/icons-material/Person";
// import PublicIcon from "@mui/icons-material/Public";
// import HomeIcon from "@mui/icons-material/Home";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";

// const CustomConnector = styled(StepConnector)(({ theme }) => ({
//   "& .MuiStepConnector-line": {
//     borderLeftWidth: 3,
//     borderColor: theme.palette.grey[300],
//     transition: "border-color 0.3s ease",
//   },
//   "& .Mui-completed .MuiStepConnector-line": {
//     borderColor: theme.palette.primary.main,
//   },
// }));

// const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: theme.palette.grey[400],
//   backgroundColor: ownerState.active
//     ? theme.palette.primary.main
//     : theme.palette.grey[300],
//   width: 40,
//   height: 40,
//   borderRadius: "50%",
//   transition: "transform 0.3s ease, background-color 0.3s ease",
//   ...(ownerState.active && {
//     color: "#fff",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
//     transform: "scale(1.1)",
//   }),
//   ...(ownerState.completed && {
//     backgroundColor: theme.palette.primary.main,
//     color: "#fff",
//   }),
// }));

// function CustomStepIcon(props) {
//   const { active, completed, icon } = props;
//   return (
//     <CustomStepIconRoot ownerState={{ completed, active }}>
//       {icon}
//     </CustomStepIconRoot>
//   );
// }

// const steps = [
//   { label: "Personal Info", icon: <PersonIcon /> },
//   { label: "Nationality", icon: <PublicIcon /> },
//   { label: "Address", icon: <HomeIcon /> },
//   { label: "Document", icon: <DescriptionIcon /> },
//   { label: "Selfie", icon: <CameraAltIcon /> },
// ];

// function VerticalStepper({ children, activeStep, onNext, onBack, idType }) {
//   const isSmallScreen = useMediaQuery("(max-width: 768px)");

//   // Ensure activeStep is within the valid range
//   const safeActiveStep = Math.min(Math.max(activeStep, 0), steps.length - 1);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center transition-all duration-300 ease-in-out">
//         {/* Stepper Section */}
//         <Box
//           className={`${
//             isSmallScreen ? "w-full flex justify-center" : "md:w-1/3 border-r"
//           } border-gray-200 p-4 md:p-8`}
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             paddingBottom: isSmallScreen ? "1rem" : "2rem",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <Stepper
//             activeStep={safeActiveStep}
//             orientation={isSmallScreen ? "horizontal" : "vertical"}
//             connector={<CustomConnector />}
//           >
//             {steps.map((step, index) => (
//               <Step key={step.label}>
//                 <StepLabel
//                   StepIconComponent={() => (
//                     <CustomStepIcon
//                       icon={step.icon}
//                       completed={safeActiveStep > index}
//                       active={safeActiveStep === index}
//                     />
//                   )}
//                 >
//                   {!isSmallScreen && (
//                     <span className="text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out">
//                       {step.label}
//                     </span>
//                   )}
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Box>

//         {/* Render Form based on the active step */}
//         <Box className="md:w-2/3 w-full p-4 md:p-8 bg-gray-50 flex flex-col justify-center">
//           <Typography
//             variant="h5"
//             className="text-center font-semibold mb-4 text-gray-800 transition-all duration-300 ease-in-out"
//           >
//             {/* {steps[safeActiveStep]?.label || "Step"} */}
//           </Typography>
//           <TransitionGroup>
//             <Collapse key={safeActiveStep} timeout={300}>
//               {children[safeActiveStep] ? (
//                 React.cloneElement(children[safeActiveStep], {
//                   onNext,
//                   onBack,
//                   idType,
//                 })
//               ) : (
//                 <Typography color="error">
//                   Component for this step is not defined.
//                 </Typography>
//               )}
//             </Collapse>
//           </TransitionGroup>
//         </Box>
//       </div>
//     </div>
//   );
// }

// export default VerticalStepper;

import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    borderLeftWidth: 3,
    borderColor: theme.palette.grey[300],
    transition: "border-color 0.3s ease",
  },
  "& .Mui-completed .MuiStepConnector-line": {
    borderColor: theme.palette.primary.main,
  },
}));

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: ownerState.active ? "#fff" : "#011452",
  backgroundColor: ownerState.active ? "#011452" : theme.palette.grey[300],
  width: 45,
  height: 45,
  borderRadius: "50%",
  boxShadow: ownerState.active ? "0 0 10px rgba(1, 20, 82, 0.6)" : "none",
  transition:
    "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
  ...(ownerState.active && {
    transform: "scale(1.15)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#011452",
    color: "#fff",
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, icon } = props;
  return (
    <CustomStepIconRoot ownerState={{ completed, active }}>
      {icon}
    </CustomStepIconRoot>
  );
}

const steps = [
  { label: "Personal Info", icon: <PersonIcon /> },
  { label: "Nationality", icon: <PublicIcon /> },
  { label: "Address", icon: <HomeIcon /> },
  { label: "Document", icon: <DescriptionIcon /> },
  { label: "Selfie", icon: <CameraAltIcon /> },
];

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

function VerticalStepper({ children, activeStep, onNext, onBack, idType }) {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const safeActiveStep = Math.min(Math.max(activeStep, 0), steps.length - 1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        className={`w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden flex ${
          isSmallScreen ? "flex-col space-y-0" : "flex-row"
        } items-center transition-all duration-300 ease-in-out`}
      >
        {/* Stepper Section */}
        <Box
          className={`${
            isSmallScreen ? "w-full flex justify-center" : "md:w-1/3 border-r"
          } border-gray-200 ${isSmallScreen ? "p-4" : "p-4 md:p-8"}`}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: isSmallScreen ? "0" : "2rem",
            transition: "all 0.3s ease",
          }}
        >
          <Stepper
            activeStep={safeActiveStep}
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            connector={<CustomConnector />}
            className="w-full"
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Tooltip
                      title={isSmallScreen ? step.label : ""}
                      arrow
                      placement="top"
                    >
                      <span>
                        <CustomStepIcon
                          icon={step.icon}
                          completed={safeActiveStep > index}
                          active={safeActiveStep === index}
                        />
                      </span>
                    </Tooltip>
                  )}
                >
                  {!isSmallScreen && (
                    <span
                      className={`text-sm font-medium ${
                        safeActiveStep === index
                          ? "text-blue-700 font-semibold"
                          : "text-gray-700"
                      } transition-all duration-300 ease-in-out`}
                    >
                      {step.label}
                    </span>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Child Component Section */}
        <Box
          className={`${
            isSmallScreen ? "w-full" : "md:w-2/3 w-full p-4 md:p-8"
          } flex flex-col justify-center`}
          style={{
            padding: isSmallScreen ? 0 : undefined, // Removes padding on mobile
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={safeActiveStep}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              style={{ width: "100%" }} // Ensures full width for child components
            >
              {children[safeActiveStep] ? (
                React.cloneElement(children[safeActiveStep], {
                  onNext,
                  onBack,
                  idType,
                })
              ) : (
                <Typography color="error">
                  Component for this step is not defined.
                </Typography>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </div>
    </div>
  );
}

export default VerticalStepper;
