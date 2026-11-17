import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
    }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page, limit }) => ({
                url: "products",
                params: {
                    limit,
                    skip: (page - 1) * limit,
                },
            }),
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;