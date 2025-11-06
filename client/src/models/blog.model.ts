import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
  author: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  thumbnail?: string;
  images?: string[];
  readCount: number;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    images: {
      type: [String],
    },
    readCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog =
  (mongoose.models.Blog as mongoose.Model<IBlog>) ||
  mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
