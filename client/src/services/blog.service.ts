import { ApiResponse, Blog } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "development" ? `http://localhost:8080/api/blog` : "https://13.203.167.206/api/blog",
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<ApiResponse<Blog[]>, void>({
      query: () => "getAll",
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query<ApiResponse<Blog>, string>({
      query: (id) => `getById?id=${id}`,
      providesTags: ["Blog"],
    }),
    getBlogsByUserEmail : builder.query<ApiResponse<Blog[]>, string>({
      query: (email) => `get?email=${email}`,
      providesTags: ["Blog"],
    }),
    createBlog: builder.mutation<
      ApiResponse<Blog>,
      {
        userId: string;
        title: string;
        content: string;
        images: string[];
        thumbnail?: string;
      }
    >({
      query: (blog) => ({
        url: "create",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<
      ApiResponse<Blog>,
      {
        content: string;
        title: string;
        images?: string[];
        thumbnail?: string;
        _id: string;
      }
    >({
      query: (blog) => ({
        url: `update/${blog._id}`,
        method: "PUT",
        body: blog,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation<ApiResponse<Blog>, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogByIdQuery,
  useGetAllBlogsQuery,
  useGetBlogsByUserEmailQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

export default blogApi;
