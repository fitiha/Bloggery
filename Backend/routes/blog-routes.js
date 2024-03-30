import express from "express";
import { clearBlogs, deleteBlog, getAllBlogs, getAllLikes, getBlogById, getBlogByUserId, getBlogLikes, updateBlog } from "../controllers/blog-controllers.js";

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);

//related with the likes
blogRouter.get('/likes', getAllLikes);

//clear the blogs database
blogRouter.get('/clear', clearBlogs);

blogRouter.get('/:id', getBlogById);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);

//related with the user
blogRouter.get('/user/:id', getBlogByUserId);

//related with the likes
blogRouter.get('/likes/:id', getBlogLikes);


export default blogRouter;