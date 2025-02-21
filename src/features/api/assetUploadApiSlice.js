import { KYC_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const assetUploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadKyc: builder.mutation({
      query: ({ id, file }) => ({
        url: `${KYC_URL}/${id}/upload`, // Fixed the misplaced curly brace
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadKycMutation } = assetUploadApiSlice; // Updated export for clarity
