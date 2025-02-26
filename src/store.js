// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";

// import storage from "redux-persist/lib/storage"; // Uses localStorage by default
// import { apiSlice } from "./features/api/apiSlice";
// import authReducer from "./features/auth/authSlice";
// import kycReducer from "./features/auth/kycSlice"; // Import the KYC slice

// // Persist configuration for auth slice
// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["token", "isAuthenticated"], // Persist only token and authentication status
// };

// // Persist configuration for kyc slice
// const kycPersistConfig = {
//   key: "kyc",
//   storage,
//   whitelist: ["kycId"], // Persist only kycId
// };

// // Create persisted reducers
// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// const persistedKycReducer = persistReducer(kycPersistConfig, kycReducer);

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: persistedAuthReducer,
//   kyc: persistedKycReducer,
//   [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query slice
// });

// const rootReducer = (state, action) => {
//   if (action.type === logout.type) {
//     // Clear persisted state by resetting reducers to their initial state
//     storage.removeItem("persist:auth");
//     storage.removeItem("persist:kyc");
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

// // Configure store
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Required for Redux Persist and RTK Query
//     }).concat(apiSlice.middleware), // Include RTK Query middleware
// });

// // Configure persistor
// export const persistor = persistStore(store);



import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { apiSlice } from "./features/api/apiSlice";
import authReducer, { logout } from "./features/auth/authSlice";
import kycReducer from "./features/auth/kycSlice"; // Import the KYC slice

// Persist configuration for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated"], // Persist only token and authentication status
};

// Persist configuration for kyc slice
const kycPersistConfig = {
  key: "kyc",
  storage,
  whitelist: ["kycId"], // Persist only kycId
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedKycReducer = persistReducer(kycPersistConfig, kycReducer);

// Combine reducers
const appReducer = combineReducers({
  auth: persistedAuthReducer,
  kyc: persistedKycReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query slice
});

// Root reducer with logout logic
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    // Clear persisted state by resetting reducers to their initial state
    storage.removeItem("persist:auth");
    storage.removeItem("persist:kyc");
    state = undefined; // Reset the state
  }
  return appReducer(state, action);
};

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist and RTK Query
    }).concat(apiSlice.middleware), // Include RTK Query middleware
});

// Configure persistor
export const persistor = persistStore(store);

// Debugging Logs for Persist
persistor.subscribe(() => {
  console.log("Persistor State Updated:", localStorage.getItem("persist:auth"));
  console.log("Persistor State Updated:", localStorage.getItem("persist:kyc"));
});
