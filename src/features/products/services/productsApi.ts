import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product } from "../types/Product";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const productsApi = createApi({
    tagTypes: ["Products"],
    reducerPath: "productsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
    }),

    endpoints: (builder) => ({


        getProducts: builder.query<
            ProductsResponse,
            {
                page: number;
                limit: number;
                category?: string;
            }
        >({
            query: ({ page, limit, category }) => ({
                url: category
                    ? `products/category/${category}`
                    : "products",
                params: {
                    limit,
                    skip: (page - 1) * limit,
                },
            }),
            providesTags: ["Products"],
        }),


        getProductById: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ["Products"],
        }),

        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (newProduct) => ({
                url: "products/add",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        editProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
            query: ({ id, ...updatedProduct }) => ({
                url: `products/${id}`,
                method: "PUT",
                body: updatedProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        getCategories: builder.query<Category[], void>({
            query: () => "products/categories",
            providesTags: ["Products"],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetCategoriesQuery } = productsApi;