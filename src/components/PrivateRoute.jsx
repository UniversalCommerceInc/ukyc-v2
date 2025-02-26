import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;


// import React, { useEffect } from "react";
// import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useMeQuery } from "../features/api/usersApiSlice";
// import toast from "react-hot-toast";

// const PrivateRoute = () => {
//     const dispatch = useDispatch();
//     const token = useSelector((state) => state.auth.token);

//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
// //   const { data: userData, isLoading } = useMeQuery();
// const { data:userData, error, isLoading } = useMeQuery(undefined, {
//     skip: !token, // Skip the query if no token exists
//   });
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData && !isLoading) {
//       const { kycs } = userData;

//       if (kycs?.length > 0) {
//         const { kycId, avlAssets } = kycs[0];

//         // Redirect based on KYC state
//         if (kycId) {
//           if (!avlAssets) {
//             toast(
//               `Document upload is pending. Redirecting to document upload...`
//             );
//             navigate(`/steps/document-upload/${kycId}`);
//           } else {
//             navigate(`/kyc/${kycId}`);
//           }
//         }
//       } else if (location.pathname === "/steps/nationality") {
//         // If they manually try to access /steps/nationality and KYC exists
//         toast.error(`You cannot access nationality step after starting KYC.`);
//         navigate("/");
//       }
//     }
//   }, [userData, isLoading, location.pathname, navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>; // Show a loading state while fetching user data
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
// };

// export default PrivateRoute;



// // import React, { useEffect } from "react";
// // import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { useMeQuery } from "../features/api/usersApiSlice";
// // import toast from "react-hot-toast";

// // const PrivateRoute = () => {
// //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
// //   const { data: userData, isLoading } = useMeQuery();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (userData && !isLoading) {
// //       const { kycs } = userData;

// //       if (kycs?.length > 0) {
// //         const { kycId, avlAssets } = kycs[0];

// //         // Redirect based on KYC state
// //         if (kycId) {
// //           if (!avlAssets) {
// //             toast.warning(
// //               `Document upload is pending. Redirecting to document upload...`,
// //               { duration: 4000 }
// //             );
// //             navigate(`/steps/document-upload/${kycId}`);
// //           } else {
// //             navigate(`/kyc/${kycId}`);
// //           }
// //         }
// //       } else {
// //         // If no KYC exists, navigate to nationality step
// //         if (location.pathname !== "/steps/nationality") {
// //           toast.info(`Redirecting to nationality step to start KYC.`);
// //           navigate(`/steps/nationality`);
// //         }
// //       }
// //     }
// //   }, [userData, isLoading, location.pathname, navigate]);

// //   // Handle scenarios where the user is authenticated but manually navigates to login/signup
// //   useEffect(() => {
// //     if (isAuthenticated && (location.pathname === "/signin" || location.pathname === "/steps/personal-info")) {
// //       if (userData && !isLoading) {
// //         const { kycs } = userData;

// //         if (kycs?.length > 0) {
// //           const { kycId, avlAssets } = kycs[0];

// //           if (kycId) {
// //             if (!avlAssets) {
// //               toast.warning(
// //                 `You already started KYC. Redirecting to document upload...`
// //               );
// //               navigate(`/steps/document-upload/${kycId}`);
// //             } else {
// //               toast.info(`Redirecting to your KYC details.`);
// //               navigate(`/kyc/${kycId}`);
// //             }
// //           }
// //         } else {
// //           navigate(`/steps/nationality`);
// //         }
// //       }
// //     }
// //   }, [isAuthenticated, userData, isLoading, location.pathname, navigate]);

// //   if (isLoading) {
// //     return <div>Loading...</div>; // Show a loading state while fetching user data
// //   }

// //   return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
// // };

// // export default PrivateRoute;
