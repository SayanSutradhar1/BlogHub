import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/TryCatch";
import ApiError from "../utils/ApiError";
import User from "../models/user.model";
import Blog from "../models/blog.model";
import mongoose from "mongoose";

const createBlog = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { userId, content, title, images, thumbnail } = req.body;

  if (!userId) {
    next(new ApiError("User is not Logged in", 401));
  }

  const author = await User.findOne({
    _id: userId,
  });

  if (!author) {
    return next(new ApiError("User not found", 404));
  }

  const newBlog = await Blog.create({
    author: author._id,
    content,
    title,
    images,
    thumbnail,
  });

  if (!newBlog) {
    next(new ApiError("Blog not created", 500));
  }

  author.blogs.push(newBlog._id as mongoose.Schema.Types.ObjectId);
  await author.save();

  res.status(201).json({
    success: true,
    status: 201,
    message: "Blog created successfully",
    data: newBlog,
  });
});

const getAllBlogs = TryCatch(async (_: Request, res: Response) => {
  const blogs = await Blog.find({});

  if (!blogs || blogs.length === 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "No blog",
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

const getBlogById = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { id } = req.query;

  const blog = await Blog.findOne({
    _id: id,
  });

  if (!blog) {
    next(new ApiError("Blog not found", 404));
  }

  return res.json({
    success: true,
    status: 200,
    message: "Blog fetched successfully",
    data: blog,
  });
});

const getBlogsByUserEmail = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { email } = req.query;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const blogs = await Blog.find({
    author: user._id,
  });

  if (!blogs || blogs.length === 0) {
    return res.status(200).json({
      success: true,
      status: 200,
      message: "No blog",
    });
  }

  return res.status(200).json({
    success: true,
    status: 200,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

const updateBlog = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { id } = req.params;
  const { content, title, images, thumbnail } = req.body;
  const blog = await Blog.findOne({
    _id: id,
  });

  if (!blog) {
    return next(new ApiError("Blog not found", 404));
  }

  blog.content = content || blog.content;
  blog.title = title || blog.title;
  blog.images?.push(...images || []);
  blog.thumbnail = thumbnail || blog.thumbnail;

  await blog.save();
  return res.json({
    success: true,
    status: 200,
    message: "Blog updated successfully",
    data: blog,
  });
});

const deleteBlog = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { id } = req.params;

  const blog = await Blog.findOne({
    _id: id,
  });

  if (!blog) {
    return next(new ApiError("Blog not found", 404));
  }

  await blog.deleteOne();

  return res.json({
    success: true,
    status: 200,
    message: "Blog deleted successfully",
  });
});

export { createBlog, getAllBlogs, getBlogById, getBlogsByUserEmail, deleteBlog, updateBlog };
