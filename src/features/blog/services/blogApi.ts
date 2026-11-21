
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
    BlogPost,
    BlogResponse,
    BlogComment,
} from "../types/blogType";

export const blogApi = createApi({
    reducerPath: "blogApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
    }),

    endpoints: (builder) => ({
        getPosts: builder.query<BlogResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: "posts",
                params: {
                    limit,
                    skip: (page - 1) * limit,
                },
            }),
        }),

        getPostById: builder.query<BlogPost, number>({
            query: (id) => `posts/${id}`,
        }),

        getPostComments: builder.query<{
            comments: BlogComment[];
            total: number;
            skip: number;
            limit: number;
        }, number>({
            query: (id) => `posts/${id}/comments`,
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetPostCommentsQuery,
} = blogApi;
