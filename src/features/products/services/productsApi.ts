import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/Product";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const productsApi = createApi({
    reducerPath: "productsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
    }),

    endpoints: (builder) => ({
        getProducts: builder.query<
            ProductsResponse,
            { page: number; limit: number }
        >({
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