import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../api/axios";

export const productQuery = createApi({
  reducerPath: "productQuery",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: ({ name, category_id, sort, page = 1, limit = 10 }) => ({
        url: "/product",
        method: "GET",
        params: { name, category_id, sort, page, limit },
      }),
      transformResponse: (response) => ({
        data: response.data.products,
        pagination: response.data.pagination,
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    getProductDetai: builder.query({
      query: ({ productId }) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data.product,
      providesTags: (result) =>
        result ? [{ type: "Product", id: result.id }] : null,
    }),
  }),
});

export const { useGetProductListQuery, useGetProductDetaiQuery } = productQuery;
