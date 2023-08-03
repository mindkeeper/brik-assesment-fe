import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../api/axios";

export const categoryQuery = createApi({
  reducerPath: "categoryQuery",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category/all",
        method: "GET",
      }),
      transformResponse: (response) => ({
        data: response.data.categories,
      }),
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryQuery;
