import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type Product, type NewProduct} from "../types/Product";

export const productApi = createApi({
    reducerPath: "productApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com/",
    }),

    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => "products",
        }),

        addProduct: builder.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "products",
                method: "POST",
                body: newProduct,
            }),
        }),
    }),

});

export const { useGetProductsQuery, useAddProductMutation } = productApi;