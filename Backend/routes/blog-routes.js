import express from "express";
import { clearBlogs, clearComments, deleteBlog, getAllBlogs, getAllComments, getAllLikes, getBlogById, getBlogByUserId, getBlogLikes, updateBlog } from "../controllers/blog-controllers.js";

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);

//related with the likes
blogRouter.get('/likes', getAllLikes);

//related with the comments 
blogRouter.get('/comments/all', getAllComments);
blogRouter.get('/comments/clear', clearComments);

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