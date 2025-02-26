// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Consent from "./pages/Consent";
// import StepperRoutes from "./StepperRoutes ";
import DocumentUpload from "./pages/DocumentUpload";
import LiveSelfieCapture from "./pages/LiveSelfieCapture";
import KycDetails from "./pages/KycDetails";
import SuccessPage from "./pages/SuccessPage";
import RedirectHandler from "./components/RedirectHandler";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import StepperRoutes from "./StepperRoutes";
// import VerticalStepper from "./components/VerticalStepper";
// import PersonalInfoForm from "./components/forms/PersonalInfoForm";
// import NationalityForm from "./components/forms/NationalityForm";
// import AddressForm from "./components/forms/AddressForm";
// import DocumentUpload from "./components/forms/DocumentUpload";
// import LiveSelfieCapture from "./components/forms/LiveSelfieCapture";

const kycData = {
  kyc: {
    id: "kyc-c0df5d54-8ecc-4fe3-8db7-04a110eb92a8",
    documentType: "pan-card",
    nationality: "India",
    dob: "2024-11-12T00:00:00.000Z",
    idNumber: "23345678978",
    idIssueDate: "2024-11-21T00:00:00.000Z",
    idExpiryDate: "2024-11-22T00:00:00.000Z",
    idIssuingCountry: "India",
    countryOfResidence: "India",
    addressLine1: "45/1, Brigade Road",
    addressLine2: "3rd Floor, Flat 302",
    city: "Langford Town",
    state: "Karnataka",
    zipCode: "560025",
    name: "abc d",
    email: "abc@mail.com",
    selfieImage: "https://imgs.search.brave.com/vnfr1rdxbQNV5JhgoROS9mHKHnAlTuuYKg92HU7ZWfw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzI1LzczLzU5/LzM2MF9GXzMyNTcz/NTkwOF9Ua3hIVTdv/a29yOUNUV0hCaGtH/ZmRSdW1PTldmSURF/Yi5qcGc",
    documentImage: "https://imgs.search.brave.com/FHA4LBfi4872QTTAKwCjCtpaAVcrLKAqJR9onw1t1EM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFhLzY3/L2YzLzFhNjdmMzI1/ZDFjYWRmNzgxOWNj/ZDY3MTBkMjg1OGUx/LmpwZw",
    kycStatus: "Approved",
    createdAt: "2024-11-21T16:58:50.125Z",
    updatedAt: "2024-11-21T16:58:50.125Z",
  },
};


function AppWithNavbar() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/consent"]; // Define the routes where the Navbar should not be shown
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/steps/personal-info" element={<StepperRoutes />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/steps/*" element={<RedirectHandler />}>
            {/* Render the StepperRoutes for step navigation */}
            <Route path="*" element={<StepperRoutes />} />
          </Route>
          <Route path="/kyc/:id" element={<KycDetails />} />
          <Route path="/kyc/success/:id" element={<SuccessPage />} />

          {/* RedirectHandler to determine navigation */}
          <Route path="/" element={<RedirectHandler />} />
        </Route>

        {/* Catch-all route to redirect to SignIn */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <AppWithNavbar />
      </Router>
    </>
  );
}



export default App;
