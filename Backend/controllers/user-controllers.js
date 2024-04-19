import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blogModel from '../models/blogModel.js';
import mongoose from 'mongoose';
import likeModel from '../models/likeModel.js';
import validator from 'validator';
import commentModel from '../models/commentModel.js';
import FollowerModel from '../models/followerModel.js';

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // const anyNull = Object.values(req.body).some(value => value === null || value === undefined || value === "");
        const anyNull = validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password);
        if (anyNull) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Some properties in the request body are null or undefined. Please provide valid values for all properties."
            });
        }

        if (validator.isEmail(email) === false) {
            return res.status(400).send("Invalid email address. Please provide a valid email address.");
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
            avatar: "avatar-1711788042524.jpg"
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
            console.log("user: ", user)
            if (!user) {
                res.status(404).json({ error: "Can't find a user with this email" });
            } else {
                let doPasswordsMatch = bcrypt.compareSync(password, user.password);
                if (!doPasswordsMatch)
                    res.status(422).json({ error: "Passwords do not match" });
                else {
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' }); //the first object can be any thing. token expires in 1hr
                    res.status(200).json({ token: token, userId: user._id, userName: user.name, userEmail: user.email, avatar: user.avatar, notification: user.notification });// we then store the token in the frontend state and use it to access the rest of the pages that require auth as a middleware 
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
    var data;
    if (req.file) {
        data = {
            name: req.body.name,
            email: req.body.email,
            avatar: req.file?.filename ?? '',
        }
    } else {
        data = {
            name: req.body.name,
            email: req.body.email,
        }
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

// comment Controller
export const makeComment = async (req, res, next) => {
    const { content, userId, blogId } = req.body;

    const newComment = new commentModel({
        content: content,
        userId: userId,
        blogId: blogId,
    });

    try {
        const response = await newComment.save();
        const newC = await commentModel.findById(response._id).populate('userId', "name avatar");
        res.status(200).json({ postedComment: newC, message: "Successfully commented." })
    } catch (err) {
        res.json({ message: err })
    }
}

// make a reply
export const makeReply = async (req, res, next) => {
    const id = req.params.id; // for which comment are you making the reply
    const { content, userId } = req.body; // who are you and what's your reply
    try {
        const updatedComment = await commentModel.findByIdAndUpdate(id, {
            $push: {
                replies: {
                    content: content,
                    userId: userId,
                }
            }
        }, { new: true });
        res.status(200).json({ updatedComment })
    } catch (err) {
        res.json({ err: err });
    }
}


export const adminLogin = (req, res) => {
    const adminEmail = "admin@admin.nat";
    const adminPassword = "admin@bloggery";
    const { email, password } = req.body;

    if (email != adminEmail || password != adminPassword) {
        res.status(404).json({ message: "Invalid credentials" })
    }

    res.status(200).json({ message: "Welcome boss!", userName: 'admin' });
}


//related with the following model
export const followUser = async (req, res) => {
    try {
        const newFollowing = await FollowerModel.create({ followerId: req.body.followerId, followingId: req.body.followingId });
        res.status(200).json({ followed: newFollowing });
    } catch (err) {
        res.json({ error: err })
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const newUnfollow = await FollowerModel.findOneAndDelete({ followerId: req.body.followerId, followingId: req.body.followingId });
        if (newUnfollow)
            res.status(200).json({ unfollowed: newUnfollow });
        else
            res.send("Couldn't get any data with the provided parameters.")
    } catch (err) {
        res.json({ error: err });
    }
}

export const getAllFollowingData = async (req, res) => {
    try {
        const allFollowingData = await FollowerModel.find();
        res.status(200).json({ allFollowingData });
    } catch (err) {
        res.send(err);
    }
}


export const checkPassword = (req, res, next) => {
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: "Can't find a user with this email" });
            } else {
                let doPasswordsMatch = bcrypt.compareSync(password, user.password);
                if (!doPasswordsMatch)
                    res.status(422).json({ error: "Passwords do not match" });
                else
                    res.status(200).json({ message: "Correct Password" });
            }
        })
        .catch((err) => {
            console.log(err?.message);
            res.status(500).json({ error: err.message });
        })
}

export const changePassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        const updatedPassword = await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true })
        res.send(updatedPassword);
    } catch (err) {
        res.send(err)
    }
}

// export const addNotification = async (req, res) => {
//     try {
//         const { userId, newNotification } = req.body;
//         const user = await userModel.findById(userId);
//         if (!user)
//             res.send("user not found.")
//         user.notification.push(newNotification)
//         await user.save();
//         res.status(200).json({ user });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }