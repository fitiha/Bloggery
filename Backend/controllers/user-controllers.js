import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blogModel from '../models/blogModel.js';
import mongoose from 'mongoose';
import likeModel from '../models/likeModel.js';

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const anyNull = Object.values(req.body).some(value => value === null || value === undefined || value === "");
        if (anyNull) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Some properties in the request body are null or undefined. Please provide valid values for all properties."
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            blog: [],
            avatar: "avatar-1711788042524"
        });

        // Save the new user
        const result = await newUser.save();
        const token = jwt.sign({ userId: result._id, email: result.email }, process.env.JWT_SECRET, { expiresIn: '1hr' }); //the first object can be any thing. token expires in 5min
        res.status(200).json({ userId: result._id, userName: result.name, token: token, userEmail: result.email, avatar: result.avatar });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res, next) => {
    // if (!req.user) { //used for extra authorization - req.user = decoded;
    //     return res.status(401).json({ error: 'Unauthorized' });
    // }
    try {
        const users = await userModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const signIn = (req, res, next) => {
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: "Can't find a user with this email" });
            } else {
                let doPasswordsMatch = bcrypt.compareSync(password, user.password);
                if (!doPasswordsMatch)
                    res.status(422).json({ error: "Passwords do not match" });
                else {
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' }); //the first object can be any thing. token expires in 1hr
                    res.status(200).json({ token: token, userId: user._id, userName: user.name, userEmail: user.email, avatar: user.avatar });// we then store the token in the frontend state and use it to access the rest of the pages that require auth as a middleware 
                }
            }
        })
        .catch((err) => {
            console.log(err?.message);
            res.status(500).json({ error: err.message });
        })
}

export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        await userModel.findById(userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: "No user found" });
                } else {
                    res.status(200).json({ user });
                }
            })
            .catch(err => { console.log(err) })
    }
    else
        console.log("invalid id");
}

export const updateUser = async (req, res, next) => {
    const userId = req.params.id;

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.file.filename || '',
    }

    await userModel.findByIdAndUpdate(userId, data, { new: true })
        .then((updated) => {
            if (!updated) {
                return res.status(404).json({ message: "No user found" });
            } else {
                res.status(200).json({ updated });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err?.message });
        })
}

export const deleteUser = async (req, res, next) => {
    if (!req.user) { //used for extra authorization - req.user = decoded;
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.params.id;
    userModel.findByIdAndDelete(userId)
        .then((user) => {
            res.status(200).json({ message: 'User deleted successfully' })
        })
        .catch((err) => {
            res.status(500).json({ message: err?.message });
        })
}

export const clearUsers = async (req, res, next) => {
    await userModel.deleteMany()
        .then(() => {
            res.status(200).json({ message: 'All users deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({ message: err?.message });
        })
}

export const addBlog = async (req, res, next) => {
    const { title, content, userId, author, category } = req.body;
    const blog = new blogModel({
        title,
        content,
        userId: req.body.userId,
        author,
        category
    });
    try {
        const response = await blogModel.create(blog);
        await userModel.findByIdAndUpdate(userId, { $push: { blogs: blog._id } }, { new: true }).exec();
        return res.status(201).json({ blog: response });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}


// like controller
export const likeBlog = async (req, res) => {
    const { userId, blogId } = req.body;

    try {
        await new likeModel({ userId: userId, blogId: blogId }).save();
        await blogModel.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

        res.status(200).json({ message: 'Blog post liked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error liking the blog post.' });
    }
};

export const unlikeBlog = async (req, res) => {
    const { userId, blogId } = req.body;

    try {
        const existingLike = await likeModel.findOne({ userId, blogId });
        if (!existingLike) {
            return res.status(400).json({ message: 'Blog post not liked.' });
        }
        await likeModel.findByIdAndDelete(existingLike._id);
        await blogModel.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });
        res.status(200).json({ message: 'Blog post un-liked successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error un-liking the blog post.' });
    }
}

export const likedBlogs = (req, res) => {
    const userId = req.params.id;
    likeModel.find({ userId })
        .then(response => {
            res.status(200).json({ response });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching liked blogs.' });
        });
}