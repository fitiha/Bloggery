import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import dotenv from 'dotenv';

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
dotenv.config();


//routes
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use('/uploads', express.static('uploads'));


//connections
mongoose.connect('mongodb+srv://admin:DGfsDLqhzNQQZ4yW@cluster0.mcijogw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('DB got Connected!')
        app.listen(5000, () => { console.log("Server listening on port 5000") })
    })
    .catch((err) => console.log("DB connection error: " + err));

//DGfsDLqhzNQQZ4yW