import express from 'express';
import { addBlog, createUser, deleteUser, getAllUsers, getUserById, signIn, updateUser } from '../controllers/user-controllers.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/signIn', signIn);

// userRouter.use(auth);
userRouter.post('/create', auth, addBlog);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/:id', deleteUser);


export default userRouter;