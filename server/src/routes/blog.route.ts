import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUserEmail,
  updateBlog,
} from "../controllers/blog.controller";

const blogRouter = Router();

blogRouter.route("/create").post(createBlog);
blogRouter.route("/getAll").get(getAllBlogs);
blogRouter.route("/get").get(getBlogsByUserEmail)
blogRouter.route("/getById").get(getBlogById);
blogRouter.route("/update/:id").put(updateBlog);
blogRouter.route("/delete/:id").delete(deleteBlog);

export { blogRouter };
