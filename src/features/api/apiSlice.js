import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://apiservice.ukyc.universalcommerce.io",
    baseUrl: "https://apiservice.ukycv2.universalcommerce.io/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      // console.log(token, "token------------")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
