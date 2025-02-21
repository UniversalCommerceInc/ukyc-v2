import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kycId: null,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setKycId: (state, action) => {
      state.kycId = action.payload;
    },
    clearKycId: (state) => {
      state.kycId = null;
    },
  },
});

export const { setKycId, clearKycId } = kycSlice.actions;

export default kycSlice.reducer;
