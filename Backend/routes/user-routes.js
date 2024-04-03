import express from 'express';
import { addBlog, clearUsers, createUser, deleteUser, getAllUsers, getUserById, likeBlog, likedBlogs, makeComment, makeReply, signIn, unlikeBlog, updateUser } from '../controllers/user-controllers.js';
import { auth } from '../middlewares/auth.mjs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) //file name + the current time - the time will be used to identify the data input
    }
});
const upload = multer({ storage: storage });
const userRouter = express.Router();


userRouter.get('/', getAllUsers);
userRouter.post('/reply/:id', makeReply);
userRouter.post('/signup', createUser);
userRouter.post('/signIn', signIn);
userRouter.post('/create', auth, addBlog);

//related with the comment
userRouter.post('/comment', makeComment);

//clear the database
userRouter.get('/clear', clearUsers);

userRouter.get('/:id', getUserById);
//related with the likes 
userRouter.post('/like', likeBlog);
userRouter.post('/unlike', unlikeBlog);

userRouter.delete('/:id', auth, deleteUser);
userRouter.patch('/update/:id', upload.single('avatar'), updateUser);

userRouter.get('/likes/:id', likedBlogs);

export default userRouter;