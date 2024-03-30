import express from 'express';
import { addBlog, clearUsers, createUser, deleteUser, getAllUsers, getUserById, likeBlog, likedBlogs, signIn, unlikeBlog, updateUser } from '../controllers/user-controllers.js';
import { auth } from '../middlewares/auth.js';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()) //file name + the current time - the time will be used to identify the data input
    }
});
const upload = multer({ storage: storage });
const userRouter = express.Router();


userRouter.get('/', getAllUsers);
userRouter.post('/signup', createUser);
userRouter.post('/signIn', signIn);
userRouter.post('/create', auth, addBlog);

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