import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../api/axios";

export const userQuery = createApi({
  reducerPath: "userQuery",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => ({
        url: "/user",
        method: "GET",
        accessToken: token,
      }),
      transformResponse: (response) => ({
        data: response.data.user,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userQuery;
