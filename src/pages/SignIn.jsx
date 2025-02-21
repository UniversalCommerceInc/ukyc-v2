// import React from "react";
// import logo from "../assets/logo.png"; // Ensure the path is correct
// import bgImage from "../assets/bg.jpg"; // Ensure the path is correct

// function SignIn() {
//   return (
//     <div
//       className="flex min-h-screen items-center justify-center bg-no-repeat bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="w-full max-w-md p-8 bg-white bg-opacity-95 rounded-2xl shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Universal KYC Logo" className="h-20 w-20" />
//         </div>
//         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
//           Sign In to Universal KYC
//         </h2>
//         <form className="space-y-6">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input type="checkbox" className="form-checkbox" />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <a href="#" className="text-sm text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
//           >
//             Sign In
//           </button>
//           <p className="text-sm text-center text-gray-600">
//             Don't have an account?{" "}
//             <a href="#" className="text-blue-600 hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLoginMutation } from "../features/api/usersApiSlice";
// import { setCredentials } from "../features/auth/authSlice";
// import logo from "../assets/logo.png";
// import bgImage from "../assets/bg.jpg";
// import { useNavigate } from "react-router-dom";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userData = await login({ login:email, password }).unwrap();
//       dispatch(setCredentials(userData));
//       setError(null);
//       // Navigate to the dashboard or another page if needed
//       console.log("Login successful!");
//     } catch (err) {
//       setError(err?.data?.message || "Something went wrong");
//     }
//   };
//   const handleLogin = () =>{
//     navigate("/consent")
//   }

//   return (
//     <div
//       className="flex min-h-screen items-center justify-center bg-no-repeat bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="w-full max-w-md p-8 bg-white bg-opacity-95 rounded-2xl shadow-2xl">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Universal KYC Logo" className="h-20 w-20" />
//         </div>
//         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
//           Sign In to Universal KYC
//         </h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error && (
//             <p className="text-sm text-red-600 text-center">{error}</p>
//           )}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input type="checkbox" className="form-checkbox" />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <a href="#" className="text-sm text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-3 text-white rounded-lg transition duration-300 ${
//               isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </button>
//           <p className="text-sm text-center text-gray-600">
//             Don't have an account?{" "}
//             <a href="#" className="text-blue-600 hover:underline" onClick={handleLogin}>

//               Sign Up
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;


import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useMeQuery } from "../features/api/usersApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { persistor } from "../store"; 
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";
import { setKycId } from "../features/auth/kycSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [triggerMe, setTriggerMe] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // State for showing the loader
  const [toastShown, setToastShown] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const toastShownRef = useRef(false);
 

  const { data: userData, isFetching: isFetchingMe } = useMeQuery(undefined, {
    skip: !triggerMe, // Skip initially, trigger after login
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log in the user
      const userData = await login({ login: email, password }).unwrap();
      dispatch(setCredentials(userData));
      await persistor.flush();
      setError(null);

      // Show loader and wait for 1 second before calling "me" API
      setShowLoader(true);
      setTimeout(() => {
        setTriggerMe(true);
        setShowLoader(false);
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.data?.message || "Something went wrong");
    }
  };

  const handleLogin = () => {
    navigate("/consent");
  };



  useEffect(() => {
    if (userData) {
   
      const { kycs } = userData;

      if (kycs && kycs.length > 0) {
        // const { kycId, avlAssets } = kycs[0];
        const { kycId, avlAssets } = kycs[kycs.length - 1];
dispatch(setKycId(kycId))
        if (kycId && !avlAssets && !toastShownRef.current) {
          toast.dismiss();
          toastShownRef.current = true;
          toast(
            `You already filled KYC entry earlier. Document upload is pending for KYC.`,
            {
              icon: "⚠️",
              style: {
                background: "#fef3c7",
                color: "#b45309",
              },
              duration: 4000,
            }
          );
          navigate(`/steps/document-upload/${kycId}`, { replace: true });
        } else if (kycId && avlAssets) {
          navigate(`/kyc/${kycId}`, { replace: true });
        }
      } else {
        navigate(`/steps/nationality`, { replace: true });
      }
    }
  }, [userData, navigate, dispatch]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
            <p className="mt-4 text-white font-semibold">Processing...</p>
          </div>
        </div>
      )}
      <div className="w-full max-w-md p-8 bg-white bg-opacity-95 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Universal KYC Logo" className="h-20 w-20" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign In to Universal KYC
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg transition duration-300 ${
              isLoading || isFetchingMe || showLoader
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading || isFetchingMe || showLoader}
          >
            {isLoading || isFetchingMe || showLoader
              ? "Processing..."
              : "Sign In"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onClick={handleLogin}
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
