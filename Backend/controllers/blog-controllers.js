import blogModel from "../models/blogModel.js";

// export const createBlog = async (req, res, next) => {
//     const { title, content, user } = req.body;

//     const blog = new blogModel({
//         title,
//         content,
//         user
//     });

//     try {
//         await blog.save();
//         res.status(201).json(blog);
//     } catch (error) {
//         res.send(error);
//     }
// }

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel.find();
        if (!blogs)
            return res.status(404).json({ message: "No blogs found" });
        else
            res.status(200).json({ blogs });
    } catch (error) {
        res.send(error);
    }
}

export const getBlogById = async (req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id);
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}

export const getBlogByUserId = async (req, res, next) => {
    try {
        const blog = await blogModel.find({ userId: req.params.id });
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}