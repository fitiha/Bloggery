import express from "express";
import { deleteBlog, getAllBlogs, getBlogById, getBlogByUserId, updateBlog } from "../controllers/blog-controllers.js";

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
// blogRouter.post('/', createBlog);
blogRouter.get('/:id', getBlogById);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);

//related with the user
blogRouter.get('/user/:id', getBlogByUserId);

export default blogRouter;