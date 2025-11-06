"use server";

import { dbconnect } from "@/lib/db";
import { ApiResponse, Blog as BlogType,User as UserType } from "@/lib/types";
import Blog from "@/models/blog.model";
import User from "@/models/user.model";

const getAllBlogs = async (): Promise<ApiResponse<BlogType[]>> => {
  try {
    await dbconnect();

    const blogs = (await Blog.find({})) as BlogType[];

    if (blogs.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No blogs found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Blogs fetched successfully",
      data: JSON.parse(JSON.stringify(blogs)),
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

const getBlogById = async (id: string): Promise<ApiResponse<BlogType>> => {
  try {
    await dbconnect();

    const blog = (await Blog.findById(id).select("+createdAt +updatedAt")) as (BlogType & {
      createdAt: Date;
      updatedAt: Date;
    });

    const author = await User.findById(blog?.author) as UserType;

    const data : BlogType = {
      _id: blog?._id,
      title: blog?.title,
      content: blog?.content,
      createdAt: blog?.createdAt,
      updatedAt: blog?.updatedAt,
      thumbnail: blog?.thumbnail,
      images: blog?.images,
      readCount: blog?.readCount,
      author
    };

    if (!blog) {
      return {
        success: false,
        status: 404,
        message: "Blog not found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Blog fetched successfully",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

const updateBlog = async (
  id: string,
  data: Partial<BlogType>
): Promise<ApiResponse<BlogType>> => {
  try {
    await dbconnect();

    const blog = (await Blog.findByIdAndUpdate(id, data, {
      new: false,
    })) as BlogType;
    if (!blog) {
      return {
        success: false,
        status: 404,
        message: "Blog not found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Blog updated successfully",
      data: blog,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

const deleteBlog = async (id: string): Promise<ApiResponse<BlogType>> => {
  try {
    await dbconnect();

    const blog = (await Blog.findByIdAndDelete(id)) as BlogType;
    if (!blog) {
      return {
        success: false,
        status: 404,
        message: "Blog not found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Blog deleted successfully",
      data: blog,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export { getAllBlogs, getBlogById, updateBlog, deleteBlog };
