// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useMeQuery } from "../features/api/usersApiSlice";

// const RedirectHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const navigate = useNavigate();

//   const { data: userData, error, isLoading } = useMeQuery(undefined, {
//     skip: !token, // Skip if token is not available
//   });

//   useEffect(() => {
//     if (!isLoading && userData) {
//       const { kycs } = userData;

//       if (kycs?.length > 0) {
//         const { kycId, avlAssets } = kycs[0];

//         if (kycId && !avlAssets) {
//           toast(
//             "You already filled KYC entry earlier. Document upload is pending for KYC.",
//             {
//               icon: "⚠️",
//               style: { background: "#fef3c7", color: "#b45309" },
//               duration: 4000,
//             }
//           );
//           navigate(`/steps/document-upload/${kycId}`, { replace: true });
//         } else if (kycId && avlAssets) {
//           navigate(`/kyc/${kycId}`, { replace: true });
//         }
//       } else {
//         navigate(`/steps/nationality`, { replace: true });
//       }
//     }

//     if (error && !isLoading) {
//       console.error("Error fetching user data:", error);
//       navigate("/signin", { replace: true });
//     }
//   }, [userData, error, isLoading, navigate]);

//   return isLoading ? <div>Loading...</div> : null; // Optional loading state
// };

// export default RedirectHandler;


import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useMeQuery } from "../features/api/usersApiSlice";

const RedirectHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData, error, isLoading } = useMeQuery(undefined, {
    skip: !token, // Skip if token is not available
  });

  useEffect(() => {
    if (!isLoading && userData) {
      const { kycs } = userData;

      if (kycs?.length > 0) {
        // const { kycId, avlAssets, status } = kycs[0];

        const lastKyc = kycs[kycs.length - 1];
        const { kycId, avlAssets, status } = lastKyc;
        // console.log("loc---", location.state?.resubmitting)
        // console.log("status---", status, location.pathname)

        if (
          // location.pathname === `/kyc/${kycId}` &&
          status === "Rejected" &&
          location.state?.resubmitting
        ) {
          // Navigate to nationality if resubmitting
          navigate(`/steps/nationality`, { replace: true });
          return;
        }

        if (kycId && !avlAssets) {
          toast(
            "You already filled KYC entry earlier. Document upload is pending for KYC.",
            {
              icon: "⚠️",
              style: { background: "#fef3c7", color: "#b45309" },
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

    if (error && !isLoading) {
      console.error("Error fetching user data:", error);
      navigate("/signin", { replace: true });
    }
  }, [userData, error, isLoading, ]);

  return isLoading ? <div>Loading...</div> : <Outlet />;
};

export default RedirectHandler;
