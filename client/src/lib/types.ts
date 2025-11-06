import { IBlog } from "@/models/blog.model";
import { IUser } from "@/models/user.model";
import mongoose, { Document } from "mongoose";

export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  error?: string;
};

export type Blog = Omit<IBlog, keyof (Document & {author:mongoose.Schema.Types.ObjectId})> & {
  _id: mongoose.Schema.Types.ObjectId;
  author : User;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type User = Omit<IUser, keyof (Document & { password: string })> & {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date | string;
};
